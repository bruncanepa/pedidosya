const {
  PY_API_URL,
  SERVER_PORT,
  PY_CLIENT_ID,
  PY_CLIENT_SECRET,
  PY_RESTAURANT_LOGO_API_URL,
  PY_PROFILE_API_URL,
  RESTAURANTS_IMAGES_PATH
} = process.env;

const PY_API_TOKEN_URI = `/tokens?clientId=${PY_CLIENT_ID}&clientSecret=${PY_CLIENT_SECRET}`;
const PY_SIGN_IN_URI = '/tokens?userName={0}&password={1}';
const PY_GET_USER_URI = '/myAccount';
const PY_GET_RESTAURANTS_URI = '/search/restaurants';

module.exports = {
  PY_API_URL,
  PY_RESTAURANT_LOGO_API_URL,
  PY_PROFILE_API_URL,
  PY_API_TOKEN_URI,
  PY_SIGN_IN_URI,
  PY_GET_USER_URI,
  PY_GET_RESTAURANTS_URI,
  PY_API_TOKEN_URL: `${PY_API_URL}${PY_API_TOKEN_URI}`,
  PY_SIGN_IN_URL: `${PY_API_URL}${PY_SIGN_IN_URI}`,
  PY_GET_USER_URL: `${PY_API_URL}${PY_GET_USER_URI}`,
  PY_GET_RESTAURANTS_URL: `${PY_API_URL}${PY_GET_RESTAURANTS_URI}`,
  SERVER_PORT: SERVER_PORT || 3001,
  AUTHORIZATION_HEADER: 'Authorization',
  USER_ID_HEADER: 'X-User-Id',
  RESTAURANTS_CACHE_CONTROL_TIME_KEY: 'RESTAURANTS_CACHE_CONTROL_TIME',
  RESTAURANTS_IMAGES_PATH
};