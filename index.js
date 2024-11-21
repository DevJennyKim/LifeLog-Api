import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import guestbookRoutes from './routes/guestbookRoutes.js';
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/guestbook', guestbookRoutes);
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}...`);
});
