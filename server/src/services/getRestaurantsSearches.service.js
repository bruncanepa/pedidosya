const {ResponseData, Cache} = require('../models');
const getUser = require('./getUser.service');

module.exports = async() => {
  const last = await Cache.getRestaurantsLastSearches();
  return new ResponseData({data: {last}, success: true});
};