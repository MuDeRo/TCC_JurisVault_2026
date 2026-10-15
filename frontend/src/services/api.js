import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Interceptor para injetar o Token JWT automaticamente nas requisições
api.interceptors.request.use((config) => {
  let token = null;

  // 1. Procura no localStorage pelo valor que corresponde a um token JWT (iniciado por 'eyJ')
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (value && value.startsWith("eyJ")) {
      token = value;
      break;
    }
  }

  // 2. Se não encontrar pelo formato JWT, tenta a chave direta 'token'
  if (!token) {
    token = localStorage.getItem("token");
  }

  // 3. Injeta o token formatado no cabeçalho Authorization
  if (token) {
    // Remove aspas adicionais caso tenha sido salvo com JSON.stringify
    const cleanToken = token.replace(/^"(.*)"$/, "$1");

    config.headers.Authorization = cleanToken.startsWith("Bearer ")
      ? cleanToken
      : `Bearer ${cleanToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;