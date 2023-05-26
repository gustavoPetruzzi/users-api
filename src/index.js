import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello world")
});

app.get('/env', (req, res) => {
  res.json(process.env);
})

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})

