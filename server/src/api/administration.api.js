const {getUser, onlineUsers, getRestaurantsSearches} = require('../services');
const {AUTHORIZATION_HEADER, USER_ID_HEADER} = require('../config');
const {headers, httpCustom} = require('../utils');
const {statusCodes} = httpCustom;
const {ResponseData, Cache} = require('../models');


const setRestaurantsCacheControlTime = async(req, res) => {
  const token = headers.get({req, key: AUTHORIZATION_HEADER});
  const result = await getUser({token});
  
  if (result.success) {
    const time = parseFloat(req.body.time);
    Cache.setRestaurantsCacheTime(time);
    res.send(new ResponseData({success: true, data: {time}}));
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(result);
  }
};

const getAdministrationInfo = async(req, res) => {
  const [usersCount, searches] = await Promise.all([
    onlineUsers.getCount(),
    getRestaurantsSearches()
  ]); 

  const data = {onlineUsers: usersCount.data, searches: searches.data};
  res.send(new ResponseData({success: true, data}));
};


module.exports = (router) => {
  router.put('/cacheControlTime', setRestaurantsCacheControlTime);
  router.get('/', getAdministrationInfo, {authorize: true});
  return router;
};