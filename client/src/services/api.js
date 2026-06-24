import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');

export const setTokens = (tokens = {}) => {
  accessToken = tokens.accessToken ?? accessToken;
  refreshToken = tokens.refreshToken ?? refreshToken;
  if (tokens.accessToken !== undefined) localStorage.setItem('accessToken', tokens.accessToken || '');
  if (tokens.refreshToken !== undefined) localStorage.setItem('refreshToken', tokens.refreshToken || '');
};

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = accessToken;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && refreshToken && !error.config._retry) {
      error.config._retry = true;
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, { refreshToken });
      setTokens(data);
      error.config.headers.Authorization = accessToken;
      return api(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;
