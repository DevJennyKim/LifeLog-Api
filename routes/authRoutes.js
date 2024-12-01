import express from 'express';
import {
  authenticateToken,
  login,
  logout,
  register,
  validatePassword,
  updateUserInfo,
  getUserInfo,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/validate-password', validatePassword);
router.put('/update-user/:userId', updateUserInfo);
router.get('/user/:userId', authenticateToken, getUserInfo);
export default router;
