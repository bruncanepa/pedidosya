const {
  PY_API_URL,
  SERVER_PORT,
  PY_CLIENT_ID,
  PY_CLIENT_SECRET
} = process.env;

module.exports = {
  PY_API_URL,
  SERVER_PORT: SERVER_PORT || 3001,
  PY_API_TOKEN_URI: `/tokens?clientId=${PY_CLIENT_ID}&clientSecret=${PY_CLIENT_SECRET}`,
  PY_SIGN_IN_URI: `/tokens?userName={0}&password={1}`,
  AUTHORIZATION_HEADER: 'Authorization',
  APP_ID_HEADER: 'X-App-Id'
};