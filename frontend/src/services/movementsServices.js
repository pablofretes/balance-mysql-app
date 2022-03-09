import axios from 'axios';

const baseUrl = '/api/movements';
let token;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getBalance = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

export const postBalance = async (id, newBalance) => {
  const config = {
    headers: { 
      Authorization: token 
    }
  };

  const response = await axios.post(`${baseUrl}/post/${id}`, newBalance, config);
  return response.data;
};

export const updateBalance = async (id, newBalance) => {
  const config = {
    headers: { 
      Authorization: token 
    }
  };

  const response = await axios.post(`${baseUrl}/update/${id}`, newBalance, config);
  return response.data;
};