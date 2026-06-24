import { createContext, useContext, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  const login = async (payload) => {
    const result = await authService.login(payload);
    setUser(result.user);
    setRefreshToken(result.refreshToken);
    return result;
  };

  const register = async (payload) => {
    const result = await authService.register(payload);
    setUser(result.user);
    setRefreshToken(result.refreshToken);
    return result;
  };

  const logout = async () => {
    await authService.logout(refreshToken);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setRefreshToken(null);
  };

  const value = useMemo(() => ({ user, login, register, logout, setUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
