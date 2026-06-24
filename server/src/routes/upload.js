import { Router } from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import { authMiddleware } from '../middleware/auth.js';
import { uploadCsv } from '../controllers/uploadController.js';

const router = Router({ mergeParams: true });
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.use(authMiddleware);
router.post('/', upload.single('file'), (req, _res, next) => {
  if (req.file?.buffer) {
    req.file.stream = Readable.from(req.file.buffer);
  }
  next();
}, uploadCsv);

export default router;
