const {ResponseData, Cache} = require('../models');
const getUser = require('./getUser.service');
const validateSession = require('./validateSession.service');

module.exports = async({token, userId}) => {
  const {success, message} = await validateSession({token, userId});
  const result = {success, message};
  if (success) {
    const last = await Cache.getRestaurantsLastSearches();
    result.data = {last};
  }
  return new ResponseData(result);
};