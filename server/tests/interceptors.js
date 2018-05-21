const nock = require('nock');

const config = require('../src/config');
const {access_token, username, password, user} = require('./values');

const headers = {reqheaders: {[config.AUTHORIZATION_HEADER]: access_token}};

const getStatusCode = ({success}) => success ? 200 : 401;

const getAppToken = () => (
  nock(config.PY_API_URL)
    .get(config.PY_API_TOKEN_URI)
    .reply(200, {success: true, access_token})
);

const signIn = (params = {}) => {
  const success = params.success === undefined || params.success;
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
  const success = params.success === undefined || params.success;
  const data = success ? user : {};
  return [
    nock(config.PY_API_URL, headers)
      .get(config.PY_GET_USER_URI)
      .reply(getStatusCode({success}), data)
  ];
}

module.exports = {
  signInSuccessful: () => signIn(),
  signInError: (data) => signIn({...data, success: false}),
  getUserSuccessful: () => getUser(),
  getUserError: () => getUser({success: false})
};