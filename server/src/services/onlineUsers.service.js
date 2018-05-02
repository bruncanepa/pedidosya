const {Memory, ResponseData} = require('../models');
const getUser = require('./getUser.service');

const memory = new Memory();

module.exports = {
  getCount: async({token}) => {
    const {success, data} = await getUser({sessionToken: token});

    if (success) {
      return new ResponseData({data: {count: memory.getOnlineUsersCount()}, success});
    }
    return {success};
  },
  addSession: async({token}) => {
    const {success, data} = await getUser({sessionToken: token});

    if (success) {
      const userId = data.user.id;
      return memory.addSession({userId, token});
    }
  },
  removeSession: ({userId, token}) => memory.removeSession({userId, token})
};