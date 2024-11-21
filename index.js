import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import guestbookRoutes from './routes/guestbookRoutes.js';
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);
app.use('/api/guestbook', guestbookRoutes);
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}...`);
});
