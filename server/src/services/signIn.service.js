const getAppToken = require('./getAppToken.service');
const {http, ResponseData} = require('../utils');
const {PY_API_URL, PY_SIGN_IN_URI} = require('../config');
const dictionary = require('../localization');

const getHeaders = (token) => ({Authorization: token});

module.exports = async({username, password}) => {
  let result = {success: false, data: {}, message: dictionary.invalidAppToken};

  const url = `${PY_API_URL}${PY_SIGN_IN_URI.format(username, password)}`;
  const {success, data} = await getAppToken();

  const {appToken} = data;
  if (success && appToken) {
    const request = {url, headers: getHeaders(appToken)};
    const signInResult = await http.get(request);
    
    const {access_token} = signInResult.data;
    if (signInResult.success && access_token) {
      result = {success: true, data: {sessionToken: access_token, appToken}};
    } else {
      result.message = dictionary.invalidLogIn;
      result.status = signInResult.status;
    }
  }

  return new ResponseData(result);
};