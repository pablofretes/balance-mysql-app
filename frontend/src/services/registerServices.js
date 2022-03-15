import jQuery from 'jquery';

const baseUrl = '/api/user';

export const registerUser = async (credentials) => {

  let response;

  await jQuery.ajax(`${baseUrl}/register`, {
    method: 'POST',
    accepts: 'application/json',
    dataType: 'json',
    data: credentials,
    success: function (data) {
      response = data;
    },
    error: function (error) {
      console.error({ error: error });
    },
  });

  return response;
};