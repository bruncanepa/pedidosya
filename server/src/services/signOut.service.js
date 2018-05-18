const onlineUsersService = require('./onlineUsers.service');
const getUserService = require('./getUser.service');
const {ResponseData} = require('../models');

module.exports = ({token, userId}) => {
  onlineUsersService.removeSession({token, userId});
  return new ResponseData({success: true});
};