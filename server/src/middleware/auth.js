import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

export const authMiddleware = (req, _res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader || null;
  if (!token) return next(new AppError(401, 'Missing access token'));
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(new AppError(401, 'Invalid access token'));
  }
};
