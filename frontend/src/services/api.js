import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajusta para a tua URL/porta do backend se for diferente
});

// Interceptor para injetar o Token JWT em todas as requisições autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;