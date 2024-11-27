import express from 'express';
import {
  getPosts,
  getPostsByCategory,
  getSinglePost,
  getCommentsByPost,
  addPosts,
} from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/category/:categoryId', getPostsByCategory);
router.get('/:postId', getSinglePost);
router.get('/:postId/comments', getCommentsByPost);
router.post('/', addPosts);
export default router;
