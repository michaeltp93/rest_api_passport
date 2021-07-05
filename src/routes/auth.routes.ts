import { Router } from 'express';
import { signUp, signIn } from '../controllers/user.controller';

const router = Router();

// Routes
router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;
