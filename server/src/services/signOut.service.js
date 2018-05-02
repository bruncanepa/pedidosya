const onlineUsersService = require('./onlineUsers.service');
const getUserService = require('./getUser.service');
const {ResponseData} = require('../models');

module.exports = async({token}) => {
  const {success, data} = await getUserService({sessionToken: token});
  if (success) {
    const userId = data.user.id;
    onlineUsersService.removeSession({userId, token});
  }
  return new ResponseData({success});
};