const {getUser, onlineUsers, getRestaurantsSearches} = require('../services');
const {AUTHORIZATION_HEADER} = require('../config');
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

const getAdministrationInfo = async(req, res) => {
  const sessionToken = headers.get({req, key: AUTHORIZATION_HEADER});

  const [usersCount, searches] = await Promise.all([
    onlineUsers.getCount({token: sessionToken}),
    getRestaurantsSearches()
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