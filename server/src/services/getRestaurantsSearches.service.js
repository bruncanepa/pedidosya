const {ResponseData, Memory} = require('../models');
const getUser = require('./getUser.service');

module.exports = async() => {
  return new ResponseData({success: true, data: { last: Memory.getRestaurantsLastSearches()}});
};