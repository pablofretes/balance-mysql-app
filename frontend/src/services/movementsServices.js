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

export const postNewMovement = async (id, newBalance) => {
  const config = {
    headers: { 
      Authorization: token 
    }
  };

  const response = await axios.post(`${baseUrl}/add/${id}`, newBalance, config);
  return response.data;
};

export const updateMovement = async (newMovement) => {
  const config = {
    headers: { 
      Authorization: token 
    }
  };
  const response = await axios.put(`${baseUrl}/update/${newMovement.id}`, newMovement, config);
  return response.data;
};

export const deleteMovement = async (id) => {
  const config = {
    headers: { 
      Authorization: token 
    }
  };

  const response = await axios.delete(`${baseUrl}/delete/${id}`, config);
  return response.data;
};

export const getMovement = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.get(`${baseUrl}/movement/${id}`, config);
  return response.data;
};