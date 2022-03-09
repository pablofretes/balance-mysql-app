import axios from "axios";

const baseUrl = '/api/user';

export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};