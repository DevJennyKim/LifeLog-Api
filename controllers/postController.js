import initKnex from 'knex';
import configuration from '../knexfile.js';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const knex = initKnex(configuration);

const getPosts = async (_req, res) => {
  try {
    const data = await knex('post')
      .join('user', 'post.user_id', 'user.id')
      .select(
        'post.id',
        'post.title',
        'post.desc',
        'post.img',
        'post.user_id',
        'user.name as username',
        'post.category_id',
        'post.likes',
        'post.created_at'
      );
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'error occurred',
      status: 500,
    });
  }
};
const getPostsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const posts = await knex('post')
      .where('category_id', categoryId)
      .join('user', 'post.user_id', 'user.id')
      .join('category', 'post.category_id', 'category.id')
      .select(
        'post.id',
        'post.title',
        'post.desc',
        'post.img',
        'post.user_id',
        'post.category_id',
        'category.category_name as category_name',
        'post.likes',
        'post.created_at',
        'user.name as username'
      );
    if (!posts) {
      return res.status(404).json({ message: `posts not found` });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    res.status(500).json({ message: 'Error fetching posts', status: 500 });
  }
};
const getSinglePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const data = await knex('post')
      .select(
        'post.id',
        'post.title',
        'post.desc',
        'post.img',
        'post.user_id',
        'user.name as username',
        'post.category_id',
        'post.likes',
        'post.created_at'
      )
      .join('user', 'post.user_id', 'user.id')
      .where('post.id', postId)
      .first();

    if (!data) {
      return res
        .status(404)
        .json({ message: `Post with ID ${postId} not found` });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching posts by id:', error);
    res.status(500).json({ message: 'Error fetching posts', status: 500 });
  }
};

const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    return res
      .status(400)
      .json({ message: 'PostId is missing in the request' });
  }
  try {
    const data = await knex('comment')
      .select(
        'comment.id',
        'comment.comment',
        'user.name as username',
        'comment.likes',
        'comment.created_at',
        'comment.post_id'
      )
      .join('user', 'comment.user_id', 'user.id')
      .where('comment.post_id', postId);

    if (data.length === 0) {
      return res
        .status(200)
        .json(
          'No comments yet! Leave a word of encouragement for the author 😊'
        );
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching comments by postId:', error);
    res.status(500).json({ message: 'Error fetching posts', status: 500 });
  }
};

const addComment = async (req, res) => {
  const { userId, postId, comment } = req.body;

  if (!userId || !postId || !comment) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [commentId] = await knex('comment').insert({
      user_id: userId,
      post_id: postId,
      comment: comment,
      likes: 0,
      created_at: knex.fn.now(),
    });

    res.status(201).json({
      message: 'Comment added successfully',
      commentId,
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};
const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const deletedCount = await knex('comment')
      .where({ id: commentId, post_id: postId })
      .del();

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: 'Comment content is required' });
  }

  try {
    const existingComment = await knex('comment')
      .where({ id: commentId, post_id: postId })
      .first();

    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const updatedComment = await knex('comment')
      .where({ id: commentId, post_id: postId })
      .update({
        comment: comment,
        updated_at: knex.fn.now(),
      })
      .returning('*');

    res.status(200).json({
      message: 'Comment updated successfully',
      updatedComment: updatedComment[0],
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Server error while updating comment' });
  }
};

const addPosts = async (req, res) => {
  const { title, content, categoryId, imageUrl, userId } = req.body;
  if (!title || !content || !categoryId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const [postId] = await knex('post').insert({
      title,
      desc: content,
      img: imageUrl,
      user_id: userId,
      category_id: categoryId,
      likes: 0,
    });

    res.status(201).json({ message: 'Post created successfully', postId });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ message: 'Error adding post' });
  }
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_req, file, cb) => {
      const uniqueFileName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, uniqueFileName);
    },
  }),
});

const deleteImageFromS3 = async (imageUrl) => {
  const fileName = imageUrl.split('/').pop();
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };
  try {
    await s3.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.error('Error deleting image from S3:', error);
    throw new Error('Image deletion from S3 failed');
  }
};

const deletePost = async (postId) => {
  try {
    const post = await knex('post').where({ id: postId }).first();
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.img) {
      await deleteImageFromS3(post.img);
    }

    await knex('post').where({ id: postId }).del();
    return { message: 'Post and image deleted successfully' };
  } catch (error) {
    console.error('Error deleting post from DB:', error);
    throw new Error('Error deleting post from DB');
  }
};

const uploadImage = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Image upload error:', err);
      return res.status(500).json({ message: 'Image upload failed' });
    }
    const imageUrl = req.file.location;
    res.status(200).json({ imageUrl });
  });
};

const updatePost = async (postId, updateData) => {
  const { title, content, categoryId, imageUrl, userId } = updateData;
  try {
    const post = await knex('post').where({ id: postId }).first();
    if (!post) {
      throw new Error('Post not found');
    }

    let newImageUrl = imageUrl || post.img;

    await knex('post')
      .where({ id: postId })
      .update({
        title: title || post.title,
        desc: content || post.desc,
        category_id: categoryId || post.category_id,
        img: newImageUrl,
        user_id: userId || post.user_id,
        updated_at: knex.fn.now(),
      });
    return { message: 'Post updated successfully' };
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Error updating post');
  }
};

export {
  getPosts,
  getPostsByCategory,
  getSinglePost,
  getCommentsByPost,
  addPosts,
  uploadImage,
  deletePost,
  updatePost,
  addComment,
  deleteComment,
  updateComment,
};
