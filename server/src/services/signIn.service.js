const getAppToken = require('./getAppToken.service');
const {request} = require('../utils');
const {PY_API_URL, PY_SIGN_IN_URI} = require('../config');

const getOptions = ({appToken, username, password}) => ({
  host: PY_API_URL,
  path: PY_SIGN_IN_URI.format(username, password),
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': appToken
  }
});

// login returns session access_token
module.exports = async({username, password}) => {
  let sessionToken = '';
  const {appToken} = await getAppToken();

  if (appToken) {
    const options = getOptions({appToken, username, password});
    const {access_token} = await request(options);
    sessionToken = access_token;
  }

  return sessionToken;
};