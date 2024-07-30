import axios from 'axios';

export const fetchInscripciones = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/inscripciones');
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
