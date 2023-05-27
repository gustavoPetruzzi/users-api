import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).send('Ok');
});

app.use(cookieParser());
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})

