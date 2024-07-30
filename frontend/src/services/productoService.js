// src/services/productoService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/productos';

export const fetchProductos = async () => {
  try {
    const token = localStorage.getItem('token'); // O de donde lo estés guardando
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
