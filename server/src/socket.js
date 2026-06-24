import jwt from 'jsonwebtoken';
import { logger } from './utils/logger.js';

export const registerSocket = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error('Missing token');
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.userId;
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.join(socket.userId);
    socket.broadcast.emit('presence:online', { userId: socket.userId });
    logger.info('socket connected', socket.id);

    socket.on('disconnect', () => {
      socket.broadcast.emit('presence:offline', { userId: socket.userId });
      logger.info('socket disconnected', socket.id);
    });
  });
};
