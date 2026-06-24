import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import listRoutes from './routes/lists.js';
import recordRoutes from './routes/records.js';
import uploadRoutes from './routes/upload.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export const createApp = (io) => {
  const app = express();
  app.use((req, _res, next) => {
    req.io = io;
    next();
  });
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));
  app.use(morgan('dev'));
  app.use(express.json({ limit: '2mb' }));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/lists', listRoutes);
  app.use('/api/lists/:listId/records', recordRoutes);
  app.use('/api/lists/:listId/upload', uploadRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
