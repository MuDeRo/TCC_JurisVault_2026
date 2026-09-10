import axios from 'axios';

// Substitua pelo IP da sua máquina ou servidor da API quando for conectar o backend
const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  timeout: 5000,
});

export default api;