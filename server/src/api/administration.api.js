const {getUser, onlineUsers, getRestaurantsSearches} = require('../services');
const {AUTHORIZATION_HEADER, RESTAURANTS_CACHE_CONTROL_TIME_KEY, USER_ID_HEADER} = require('../config');
const {headers, http} = require('../utils');
const {statusCodes} = http;
const {ResponseData, Cache} = require('../models');

const setRestaurantsCacheControlTime = async(req, res) => {
  const token = headers.get({req, key: AUTHORIZATION_HEADER});
  const result = await getUser({token});
  
  if (result.success) {
    const time = parseFloat(req.body.time);
    process.env[RESTAURANTS_CACHE_CONTROL_TIME_KEY] = time;
    res.send(new ResponseData({success: true, data: {time}}));
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(result);
  }
};

const getAdministrationInfo = async(req, res) => {
  const token = headers.get({req, key: AUTHORIZATION_HEADER});
  const userId = headers.get({req, key: USER_ID_HEADER});
  
  const [usersCount, searches] = await Promise.all([
    onlineUsers.getCount({token, userId}),
    getRestaurantsSearches({token, userId})
  ]); 
  
  if (usersCount.success) {
    const response = new ResponseData({success: true, data: {onlineUsers: usersCount.data, searches: searches.data}});
    res.send(response);
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(usersCount);
  }
};


module.exports = (router) => {
  router.put('/cacheControlTime', setRestaurantsCacheControlTime);
  router.get('/', getAdministrationInfo);
  return router;
};