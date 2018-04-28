const {PY_API_URL, SERVER_PORT, CLIENT_ID, CLIENT_SECRET} = process.env;

module.exports = {
  PY_API_URL,
  SERVER_PORT,
  PY_API_TOKEN_URI: `tokens?clientId=${CLIENT_ID}&clientSecret=${CLIENT_SECRET}`,
  PY_SIGN_IN_URI: `tokens?userName={0}&password={1}`
};