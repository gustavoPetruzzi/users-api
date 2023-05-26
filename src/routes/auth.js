import express from 'express';
import { signUp } from '../controller/auth.js';
import { isValidEmail } from '../middleware/is-valid-email.js';
const router = express.Router();

router.post('/signup', isValidEmail, signUp);

export default router;