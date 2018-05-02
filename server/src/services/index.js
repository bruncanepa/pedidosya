const getAppToken = require('./getAppToken.service');
const signIn = require('./signIn.service');
const signOut = require('./signOut.service');
const getUser = require('./getUser.service');
const getRestaurants = require('./getRestaurants.service');
const getRestaurantImage = require('./getRestaurantImage.service');
const onlineUsers = require('./onlineUsers.service');

module.exports = {
  getAppToken,
  signIn,
  signOut,
  getUser,
  getRestaurants,
  getRestaurantImage,
  onlineUsers
};