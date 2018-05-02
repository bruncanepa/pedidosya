const {getUser, onlineUsers} = require('../services');
const {AUTHORIZATION_HEADER, RESTAURANTS_CACHE_CONTROL_TIME} = require('../config');
const {headers} = require('../utils');
const {http} = require('../utils');
const {statusCodes} = http;
const {ResponseData} = require('../models');

const setRestaurantsCacheControlTime = async(req, res) => {
  const sessionToken = headers.get({req, key: AUTHORIZATION_HEADER});
  const result = await getUser({sessionToken});
  
  if (result.success) {
    const time = parseFloat(req.body.time);
    process.env['RESTAURANTS_CACHE_CONTROL_TIME'] = time;
    res.send(new ResponseData({success: true, data: {time}}));
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(result);
  }
};

const getOnlineUsersCount = async(req, res) => {
  const sessionToken = headers.get({req, key: AUTHORIZATION_HEADER});

  const result = await onlineUsers.getCount({token: sessionToken});
  
  if (result.success) {
    res.send(result);
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(result);
  }
};

module.exports = (router) => {
  router.put('/cacheControlTime', setRestaurantsCacheControlTime);
  router.get('/onlineUsers', getOnlineUsersCount);
  return router;
};