import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + '/inscripciones';

export const getInscriptions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateInscriptionStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, { status });
  return response.data;
};
