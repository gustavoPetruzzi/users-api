import express from 'express';
import { signUp, login, logout, me } from '../controller/auth.js';
import { isValidEmail } from '../middleware/is-valid-email.js';
const router = express.Router();

router.post('/signup', isValidEmail, signUp);

router.post('/login', isValidEmail, login);

router.get('/logout', logout);

router.get('/me', me);

export default router;