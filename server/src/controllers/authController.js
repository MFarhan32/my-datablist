import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import { constants } from '../config/constants.js';

const generateTokens = (userId) => ({
  accessToken: jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: constants.jwtExpiresIn }),
  refreshToken: jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: constants.refreshExpiresIn }),
});

const safeString = (value) => (typeof value === 'string' ? value.trim() : '');

export const register = async (req, res, next) => {
  try {
    const email = safeString(req.body.email).toLowerCase();
    const password = safeString(req.body.password);
    const name = safeString(req.body.name);
    const exists = await User.findOne({ email });
    if (exists) throw new AppError(409, 'Email already registered');
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, name });
    const tokens = generateTokens(user.id);
    user.refreshTokens.push(tokens.refreshToken);
    await user.save();
    res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, ...tokens });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const email = safeString(req.body.email).toLowerCase();
    const password = safeString(req.body.password);
    const user = await User.findOne({ email });
    if (!user) throw new AppError(401, 'Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new AppError(401, 'Invalid credentials');
    const tokens = generateTokens(user.id);
    user.refreshTokens.push(tokens.refreshToken);
    await user.save();
    res.json({ user: { id: user.id, email: user.email, name: user.name }, ...tokens });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new AppError(401, 'Missing refresh token');
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.userId);
    if (!user || !user.refreshTokens.includes(refreshToken)) throw new AppError(401, 'Invalid refresh token');
    const tokens = generateTokens(user.id);
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken).concat(tokens.refreshToken);
    await user.save();
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await User.updateOne({ _id: req.user.userId }, { $pull: { refreshTokens: refreshToken } });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('_id email name createdAt updatedAt');
    if (!user) throw new AppError(404, 'User not found');
    res.json({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt, updatedAt: user.updatedAt });
  } catch (error) {
    next(error);
  }
};
