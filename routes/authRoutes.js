import express from 'express';
import {
  login,
  logout,
  register,
  validatePassword,
  updateUserInfo,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/validate-password', validatePassword);
router.put('/update-user/:userId', updateUserInfo);

export default router;
