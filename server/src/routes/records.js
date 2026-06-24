import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  bulkDeleteRecords,
  createRecord,
  deleteRecord,
  detectDuplicates,
  exportRecords,
  getRecords,
  updateRecord,
} from '../controllers/recordController.js';

const router = Router({ mergeParams: true });

router.use(authMiddleware);
router.get('/', getRecords);
router.post('/', createRecord);
router.patch('/:id', updateRecord);
router.delete('/:id', deleteRecord);
router.post('/bulk-delete', bulkDeleteRecords);
router.get('/export', exportRecords);
router.post('/duplicates', detectDuplicates);

export default router;
