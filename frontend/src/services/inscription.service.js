// src/services/inscriptionService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/inscriptions";

export const getInscriptions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateInscriptionStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, { status });
  return response.data;
};
