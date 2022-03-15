import jQuery from 'jquery';
import { token } from './movementsServices';

const baseUrl = '/api/balance';

export const getBalance = async (id) => {
  let response;

  await jQuery.ajax(`${baseUrl}/${id}`, {
    method: 'GET',
    accepts: 'application/json',
    dataType: 'json',
    headers: {
      "authorization": token
    },
    success: function (data) {
      response = data;
    },
    error: function (error) {
      console.error({ error: error });
    },
  });


  return response;
};

export const postBalance = async (id, newBalance) => {
  let response;

  await jQuery.ajax(`${baseUrl}/post/${id}`, {
    method: 'POST',
    accepts: 'application/json',
    dataType: 'json',
    data: newBalance,
    headers: {
      "authorization": token
    },
    success: function (data) {
      response = data;
    },
    error: function (error) {
      console.error({ error: error });
    },
  });

  return response;
};

export const updateBalance = async (id, newBalance) => {
  let response;

  await jQuery.ajax(`${baseUrl}/update/${id}`, {
    method: 'PUT',
    accepts: 'application/json',
    dataType: 'json',
    data: newBalance,
    headers: {
      "authorization": token
    },
    success: function (data) {
      response = data;
    },
    error: function (error) {
      console.error({ error: error });
    },
  });

  return response;
};