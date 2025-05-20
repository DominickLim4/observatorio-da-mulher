import axios from 'axios';

const API_URL = 'https://mulheres-app-api.onrender.com';

const api = axios.create({ baseURL: API_URL });

export const submitForm = async (formData) => {
  const response = await api.post('/api/forms', formData);
  return response.data;
};

export const getForms = async () => {
  const response = await api.get('/api/forms');
  return response.data;
};

export default api;