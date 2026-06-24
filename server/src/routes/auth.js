import { Router } from 'express';
import { loginValidation, registerValidation } from '../utils/validators.js';
import { validateRequest } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { login, logout, profile, refresh, register } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.post('/refresh', refresh);
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, profile);

export default router;
