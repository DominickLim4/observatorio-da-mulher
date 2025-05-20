import axios from 'axios';

const API_URL = 'https://mulheres-app-api.onrender.com/api';

const api = axios.create({ baseURL: API_URL });

export const submitForm = async (formData) => {
 const response = await api.post('/forms', formData);
 return response.data;
};

/*export const getForms = async () => {
 const response = await api.get('/forms');
 return response.data;
};*/

export default api;