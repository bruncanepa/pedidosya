const {Cache, ResponseData} = require('../models');
const getUser = require('./getUser.service');
const dictionary = require('../localization');
const validateSession = require('./validateSession.service');

module.exports = {
  getCount: async({token, userId}) => {
    const {success, message} = await validateSession({userId, token});
    if (success) {
      return new ResponseData({data: {count: Cache.getOnlineUsersCount()}, success});
    }
    return new ResponseData({success, message});
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
    const {success, message} = await validateSession({userId, token});
    if (success) {
      Cache.removeSession({userId, token}); 
    }
    return new ResponseData({success, message});
  }
};