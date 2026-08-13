import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Interceptor para injetar o Token JWT automaticamente nas requisições
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token"); // ou o nome que você usou para salvar o token
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;