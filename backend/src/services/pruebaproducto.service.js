import axios from 'axios';

const getAllProducts = async () => {
  try {
    const response = await axios.get(${API_URL}/products);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // O maneja el error según tu necesidad
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(${API_URL}/products/${productId});
    return response.data;
  } catch (error) {
    console.error('Error fetching product with ID ${productId}: ', error);
    throw error; // O maneja el error según tu necesidad
  }
};

const addProduct = async (productData) => {
  try {
    const response = await axios.post(${API_URL}/products, productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error; // O maneja el error según tu necesidad
  }
};

const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(${API_URL}/products/${productId}, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product with ID ${productId}: ', error);
    throw error; // O maneja el error según tu necesidad
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(${API_URL}/products/${productId});
    return response.data;
  } catch (error) {
    console.error('Error deleting product with ID ${productId}: ', error);
    throw error; // O maneja el error según tu necesidad
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
