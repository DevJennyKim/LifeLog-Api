import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8081;
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));
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
app.use('/api/posts', postRoutes);
app.use('/api/category', categoryRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}...`);
});
