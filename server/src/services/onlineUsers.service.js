const {Memory, ResponseData} = require('../models');
const getUser = require('./getUser.service');

module.exports = {
  getCount: async({token}) => {
    const {success, data, message} = await getUser({sessionToken: token});

    if (success) {
      return new ResponseData({data: {count: Memory.getOnlineUsersCount()}, success});
    }
    return {success, message};
  },
  addSession: async({token}) => {
    const {success, data} = await getUser({sessionToken: token});

    if (success) {
      const userId = data.user.id;
      return Memory.addSession({userId, token});
    }
  },
  removeSession: ({userId, token}) => Memory.removeSession({userId, token})
};