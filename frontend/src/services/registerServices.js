import axios from 'axios';

const baseUrl = '/api/user';

export const registerUser = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);
  return response.data;
};