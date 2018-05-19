const {PY_GET_USER_URI} = require('../config');
const {httpCustom, headers} = require('../utils');
const {ResponseData, User} = require('../models');
const dictionary = require('../localization');

const url = PY_GET_USER_URI;

module.exports = async({token}) => {
  const result = {success: false, message: dictionary.invalidSessionToken};
  
  const {success, data} = await httpCustom.get({url, headers: headers.create(token)});

  if (success) {
    result.success = true;
    result.message = '';
    result.data = {user: new User(data)};
  } 

  return new ResponseData(result);
};