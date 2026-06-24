import api, { setTokens } from './api';

export const authService = {
  async login(payload) {
    const { data } = await api.post('/auth/login', payload);
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    return data;
  },
  async register(payload) {
    const { data } = await api.post('/auth/register', payload);
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    return data;
  },
  async profile() {
    const { data } = await api.get('/auth/profile');
    return data;
  },
  async logout(refreshToken) {
    await api.post('/auth/logout', { refreshToken });
    setTokens({ accessToken: '', refreshToken: '' });
  },
};
