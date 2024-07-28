import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Cambia esto a la URL de tu API

export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data; // Asegúrate de que el backend envíe un token de autenticación
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
