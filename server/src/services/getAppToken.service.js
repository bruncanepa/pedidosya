const {PY_API_URL, PY_API_TOKEN_URI} = require('../config');
const {request} = require('../utils');

const options = {
  host: PY_API_URL,
  path: PY_API_TOKEN_URI,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

module.exports = async() => {
  const {access_token} = await request(options);
  return {appToken: access_token};
};