const {ResponseData, Memory} = require('../models');
const getUser = require('./getUser.service');
const validateSession = require('./validateSession.service');

module.exports = async({token, userId}) => {
  const {success, message} = await validateSession({token, userId});
  const result = {success, message};
  if (success) {
    result.data = {last: Memory.getRestaurantsLastSearches()};
  }
  return new ResponseData(result);
};