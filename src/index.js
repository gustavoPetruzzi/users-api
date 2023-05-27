import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})

