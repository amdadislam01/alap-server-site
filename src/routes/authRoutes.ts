import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// authentication endpoints for signing up and logging in
router.post('/register', register);
router.post('/login', login);

export default router;
