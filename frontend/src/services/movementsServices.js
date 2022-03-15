import jQuery from 'jquery';

const baseUrl = '/api/movements';
export let token;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const postNewMovement = async (id, newBalance) => {
  let response;

  await jQuery.ajax(`${baseUrl}/add/${id}`, {
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

export const updateMovement = async (newMovement) => {
  let response;

  await jQuery.ajax(`${baseUrl}/update/${newMovement.id}`, {
    method: 'PUT',
    accepts: 'application/json',
    dataType: 'json',
    data: newMovement,
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

export const deleteMovement = async (id) => {
  let response;

  await jQuery.ajax(`${baseUrl}/delete/${id}`, {
    method: 'DELETE',
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

export const getMovement = async (id) => {
  let response;

  await jQuery.ajax(`${baseUrl}/movement/${id}`, {
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