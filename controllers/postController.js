import initKnex from 'knex';
import configuration from '../knexfile.js';
const knex = initKnex(configuration);

const getPosts = async (req, res) => {
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
const addPosts = (req, res) => {};
export {
  getPosts,
  getPostsByCategory,
  getSinglePost,
  getCommentsByPost,
  addPosts,
};
