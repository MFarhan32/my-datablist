import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDatabase = async (mongoUri) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, { maxPoolSize: 10 });
  logger.info('MongoDB connected');
};
