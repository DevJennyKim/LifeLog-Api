import express from 'express';
import {
  getPosts,
  getPostsByCategory,
  getSinglePost,
  getCommentsByPost,
  addPosts,
  uploadImage,
  deletePost,
  addComment,
  updatePost,
  deleteComment,
  updateComment,
} from '../controllers/postController.js';

const router = express.Router();

router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await deletePost(postId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await updatePost(postId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:postId/comments/:commentId', deleteComment);
router.put('/:postId/comments/:commentId', updateComment);
router.post('/', addPosts);
router.post('/upload', uploadImage);
router.get('/', getPosts);
router.get('/category/:categoryId', getPostsByCategory);
router.get('/:postId', getSinglePost);
router.get('/:postId/comments', getCommentsByPost);
router.post('/:postId/comments', addComment);

export default router;
