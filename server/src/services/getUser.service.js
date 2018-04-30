const {PY_API_URL, PY_GET_USER_URI} = require('../config');
const {http, headers} = require('../utils');
const {ResponseData, User} = require('../models');
const dictionary = require('../localization');

const url = `${PY_API_URL}${PY_GET_USER_URI}`;

module.exports = async({sessionToken}) => {
  const result = {success: false, message: dictionary.invalidSessionToken};
  
  const {success, data} = await http.get({url, headers: headers(sessionToken)});

  if (success) {
    result.success = true;
    result.message = '';
    result.data = {user: new User(data)};
  } 

  return new ResponseData(result);
};