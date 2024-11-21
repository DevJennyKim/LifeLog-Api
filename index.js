import 'dotenv/config';
import express from 'express';
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
