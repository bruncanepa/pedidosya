const {Memory, ResponseData} = require('../models');
const dictionary = require('../localization');

module.exports = ({userId, token}) => {
  return new Promise((resolve) => {
    const valid = Memory.isValidSession({userId, token});
    const message = valid ? '' : dictionary.invalidSessionToken;
    resolve(new ResponseData({success: valid, message}));
  });
};