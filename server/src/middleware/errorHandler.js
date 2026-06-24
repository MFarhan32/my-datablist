import { logger } from '../utils/logger.js';

export class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFound = (_req, _res, next) => next(new AppError(404, 'Route not found'));

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  if (statusCode >= 500) logger.error(err);
  res.status(statusCode).json({ error: message });
};
