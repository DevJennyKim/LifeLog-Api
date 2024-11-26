import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
// import postRoutes from './routes/postRoutes.js';
// import commentRoutes from './routes/commentRoutes.js';
// import guestbookRoutes from './routes/guestbookRoutes.js';
const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.options('*', cors());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/posts/:postId/comments', commentRoutes);
// app.use('/api/guestbook', guestbookRoutes);
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}...`);
});
