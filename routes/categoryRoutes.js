import express from 'express';
import { login, logout, register } from '../controllers/authController.js';

const router = express.Router();

export default router;
