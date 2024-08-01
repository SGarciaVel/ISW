import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/inscripciones';

export const fetchInscripciones = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
