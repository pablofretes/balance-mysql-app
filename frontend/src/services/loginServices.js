import jQuery from "jquery";

const baseUrl = '/api/user';

export const login = async (credentials) => {
  let response;

  await jQuery.ajax(`${baseUrl}/login`, {
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