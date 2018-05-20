const {Cache, ResponseData} = require('../models');
const getUser = require('./getUser.service');
const dictionary = require('../localization');
const validateSession = require('./validateSession.service');

module.exports = {
  getCount: async() => {
    const count = await Cache.getOnlineUsersCount();
    return new ResponseData({data: {count}, success: true});
  },
  addSession: async({token}) => {
    const {success, data, message} = await getUser({token: token});
    if (success) {
      const userId = data.user.id;
      Cache.addSession({userId, token});
    }
    return new ResponseData({success, message});
  },
  removeSession: async({token, userId}) => {
    Cache.removeSession({userId, token}); 
    return new ResponseData({success: true});
  }
};