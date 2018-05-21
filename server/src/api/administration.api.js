const {getUser, onlineUsers, getRestaurantsSearches} = require('../services');
const {AUTHORIZATION_HEADER, USER_ID_HEADER} = require('../config');
const {headers, httpCustom} = require('../utils');
const {statusCodes} = httpCustom;
const {ResponseData, Cache} = require('../models');


const setRestaurantsCacheTime = async(req, res) => {
  const time = parseFloat(req.body.time);
  await Cache.setRestaurantsCacheTime(time);
  res.send(new ResponseData({success: true, data: {time}}));
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
  router.put('/', setRestaurantsCacheTime);
  router.get('/', getAdministrationInfo);
  return router;
};