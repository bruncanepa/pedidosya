const {Cache, ResponseData} = require('../models');
const dictionary = require('../localization');

module.exports = async({userId, token}) => {
  const valid = await Cache.isValidSession({userId, token});
  const message = valid ? '' : dictionary.invalidSessionToken;
  return new ResponseData({success: valid, message});
};