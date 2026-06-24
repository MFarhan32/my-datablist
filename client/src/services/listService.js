import api from './api';

export const listService = {
  getAll: async () => (await api.get('/lists')).data,
  create: async (payload) => (await api.post('/lists', payload)).data,
  update: async (id, payload) => (await api.patch(`/lists/${id}`, payload)).data,
  remove: async (id) => api.delete(`/lists/${id}`),
};
