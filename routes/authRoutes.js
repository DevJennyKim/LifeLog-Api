import express from 'express';
import {
  login,
  logout,
  register,
  validatePassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/validate-password', validatePassword);

export default router;
