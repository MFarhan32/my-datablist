import { validationResult } from 'express-validator';
import { AppError } from './errorHandler.js';

export const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(400, errors.array().map((e) => e.msg).join(', ')));
  }
  return next();
};
