import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDatabase = async (mongoUri) => {
  mongoose.set('strictQuery', true);
  mongoose.set('sanitizeFilter', true);
  await mongoose.connect(mongoUri, { maxPoolSize: 10 });
  logger.info('MongoDB connected');
};
