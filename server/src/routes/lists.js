import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { idParamValidation, listValidation } from '../utils/validators.js';
import { createList, deleteList, getLists, updateList } from '../controllers/listController.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getLists);
router.post('/', listValidation, validateRequest, createList);
router.patch('/:id', idParamValidation, validateRequest, updateList);
router.delete('/:id', idParamValidation, validateRequest, deleteList);

export default router;
