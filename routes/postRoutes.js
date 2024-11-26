import express from 'express';
import { getPosts, getPostsByCategory } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/category/:categoryId', getPostsByCategory);
export default router;
