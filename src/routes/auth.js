import express from 'express';
import { signUp, login } from '../controller/auth.js';
import { isValidEmail } from '../middleware/is-valid-email.js';
const router = express.Router();

router.post('/signup', isValidEmail, signUp);

router.post('/login', isValidEmail, login);
export default router;