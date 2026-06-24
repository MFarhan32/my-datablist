import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from '../services/socketService';

export const useSocket = (token, handlers = {}) => {
  useEffect(() => {
    if (!token) return undefined;
    const socket = connectSocket(token);
    Object.entries(handlers).forEach(([event, handler]) => socket.on(event, handler));
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => socket.off(event, handler));
      disconnectSocket();
    };
  }, [token]);
};
