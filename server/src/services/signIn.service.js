const getAppToken = require('./getAppToken.service');
const {http, headers} = require('../utils');
const {ResponseData} = require('../models');
const {PY_API_URL, PY_SIGN_IN_URI} = require('../config');
const dictionary = require('../localization');

const baseURL = `${PY_API_URL}${PY_SIGN_IN_URI}`;

const signIn = async({appToken, username, password}) => {
  const url = `${baseURL.format(username, password)}`;
  const request = {url, headers: headers(appToken)};
  const result = {success: false, message: dictionary.invalidLogIn};

  const {success, data} = await http.get(request);
  const {access_token} = data;

  if (success && access_token) {
    result.success = true;
    result.data = {sessionToken: access_token, appToken};
    result.message = '';
  } 

  return result;
};

module.exports = async({username, password}) => {
  let result = {success: false, message: dictionary.invalidAppToken};

  const {success, data} = await getAppToken();
  const {appToken} = data;

  if (success && appToken) {
    result = await signIn({appToken, username, password});
  }

  return new ResponseData(result);
};