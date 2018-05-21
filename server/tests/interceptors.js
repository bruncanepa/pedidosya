const nock = require('nock');

const config = require('../src/config');
const {access_token, username, password, user, restaurants} = require('./values');

const headers = {reqheaders: {[config.AUTHORIZATION_HEADER]: access_token}};

const getStatusCode = ({success}) => success ? 200 : 401;

const getSuccess = ({success}) => success === undefined || success;

const getAppToken = () => (
  nock(config.PY_API_URL)
    .get(config.PY_API_TOKEN_URI)
    .reply(200, {success: true, access_token})
);

const signIn = (params = {}) => {
  const success = getSuccess(params);
  const data = success ? {access_token} : {};
  const appTokenInterceptor = getAppToken();
  const usersInterceptors = success ? [appTokenInterceptor, ...getUser()] : [appTokenInterceptor];
  return [
    ...usersInterceptors,
    nock(config.PY_API_URL, headers)
      .get(config.PY_SIGN_IN_URI.format(params.username || username, params.password || password))
      .reply(getStatusCode({success}), data)
  ];
};

const getUser = (params = {}) => {
  const success = getSuccess(params);
  const data = success ? user : {};
  return [
    nock(config.PY_API_URL, headers)
      .get(config.PY_GET_USER_URI)
      .reply(getStatusCode({success}), data)
  ];
};

const fields = 'name,topCategories,ratingScore,logo,deliveryTimeMaxMinutes,link';
const getRestaurants = (params = {}) => {
  const success = getSuccess(params);
  const {latitude, longitude} = params;
  const data = success ? {data: restaurants} : {};  
  const uri = `${config.PY_GET_RESTAURANTS_URI}?country=1&point=${latitude},${longitude}&offset=0&max=20&sort=rating&fields=${fields}`;
  return [
    nock(config.PY_API_URL, headers)
      .get(uri)
      .reply(getStatusCode({success}), data)
  ];
};

const getRestaurantImage = (params = {}) => {
  const success = getSuccess(params);
  const data = success ? {image: params.image} : {};  
  return [
    nock(config.PY_RESTAURANT_LOGO_API_URL)
      .get(`/${params.image}`)
      .reply(getStatusCode({success}), data)
  ];
};

module.exports = {
  signInSuccess: () => signIn(),
  signInError: (data) => signIn({...data, success: false}),
  getUserSuccess: () => getUser(),
  getUserError: () => getUser({success: false}),
  getRestaurantsSuccess: (data) => getRestaurants(data),
  getRestaurantsError: (data) => getRestaurants({...data, success: false}),
  getRestaurantImageSuccess: (data) => getRestaurantImage(data),
  getRestaurantImageError: (data) => getRestaurantImage({...data, success: false})
};