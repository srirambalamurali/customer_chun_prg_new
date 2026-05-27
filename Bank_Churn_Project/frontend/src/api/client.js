import axios from 'axios';

const defaultBase = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '/api');

const api = axios.create({
  baseURL: defaultBase,
  timeout: 20000,
});

export const predictCustomer = (payload) => api.post('/predict', payload);
