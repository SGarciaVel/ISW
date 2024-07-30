import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// Configuración de interceptores para agregar el token a cada solicitud
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken'); // Obtener el token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
