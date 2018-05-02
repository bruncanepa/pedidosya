const getAppToken = require('./getAppToken.service');
const signIn = require('./signIn.service');
const getUser = require('./getUser.service');
const getRestaurants = require('./getRestaurants.service');
const getRestaurantImage = require('./getRestaurantImage.service');

module.exports = {
  getAppToken,
  signIn,
  getUser,
  getRestaurants,
  getRestaurantImage
};