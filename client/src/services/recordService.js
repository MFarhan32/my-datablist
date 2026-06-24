import api from './api';

export const recordService = {
  getAll: async (listId, params = {}) => (await api.get(`/lists/${listId}/records`, { params })).data,
  create: async (listId, payload) => (await api.post(`/lists/${listId}/records`, payload)).data,
  update: async (listId, id, payload) => (await api.patch(`/lists/${listId}/records/${id}`, payload)).data,
  remove: async (listId, id) => api.delete(`/lists/${listId}/records/${id}`),
  bulkDelete: async (listId, ids) => (await api.post(`/lists/${listId}/records/bulk-delete`, { ids })).data,
  duplicates: async (listId, keys = []) => (await api.post(`/lists/${listId}/records/duplicates`, { keys })).data,
};
