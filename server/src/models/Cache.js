const uuid = require('../utils/uuid.util');
const Redis = require('./Redis');
const config = require('../config');

const RESTAURANTS_MAX_LAST_SEARCHES = 10;

const keys = {
  lastRestaurantsSearches: 'last_restaurants_searches',
  onlineUsers: 'online_users',
  onlineUsersCount: 'online_users_count',
  restaurantPrefix: 'restaurant',
  userPrefix: 'user',
  restaurantsCacheTime: 'restaurants_cache_time'
};

/* DATA MODEL
  last_restaurants_searches: [{id, latitude, longitude}]
  online_users: number
  restaurants_cache_time: number
  restaurant_${latitude}_${longitude}: [Restaurant]
  user_${userId}: {session1, ..., sessionN}
*/
function Cache() {
  const self = this;
  self.data = new Redis();
};

Cache.prototype.getUser = function(userId) {
  return this.data.getHash({key: getUserKey({userId})});
};

Cache.prototype.addUser = function({userId, token}) {
  this.updateUsersOnlineCount();
  this.data.setHash({key: getUserKey({userId}), value: {[token]: token}});
};

Cache.prototype.removeUser = function({userId}) {
  this.updateUsersOnlineCount(false);
  this.data.remove({key: getUserKey({userId})});
};

Cache.prototype.getSession = async function({userId, token}) {
  const user = await this.getUser(userId);
  return user && user[token];
};

Cache.prototype.addSession = async function({userId, token}){
  const user = await this.getUser(userId);
  const key = getUserKey({userId});
  if (user) {
    this.data.updateHash({key, field: token, value: token});
  } else {
    this.addUser({userId, token});
  }
};

Cache.prototype.removeSession = async function({userId, token}) {
  const user = await this.getUser(userId);
  if (user) {
    const key = getUserKey({userId});
    if (Object.keys(user).length == 1) {
      this.removeUser({userId});
    } else {
      this.data.deleteHashField({key, field: token});
    }
  }
};

Cache.prototype.isValidSession = async function({userId, token}) { 
  const session = await this.getSession({userId, token});
  return !!session;
};

Cache.prototype.getOnlineUsersCount = async function() {
  const count = await this.data.get({key: keys.onlineUsersCount});
  return count || 0;
};

Cache.prototype.updateUsersOnlineCount = async function(add = true) {
  const key = keys.onlineUsersCount;
  const count = await this.getOnlineUsersCount();
  this.data.set({key, value: add ? count + 1 : count - 1});
};

Cache.prototype.getRestaurantsLastSearches = function() {
  return this.data.getList({key: keys.lastRestaurantsSearches});
};

Cache.prototype.addRestaurantSearch = async function(search) {
  const searches = await this.data.getList({key: keys.lastRestaurantsSearches});

  if (searches.length >= RESTAURANTS_MAX_LAST_SEARCHES) {
    this.data.leftPop({key: keys.lastRestaurantsSearches});
  }

  const {latitude, longitude} = search;
  const value = {id: uuid('search'), latitude, longitude};

  this.data.rightPush({key: keys.lastRestaurantsSearches, value});
  this.data.set({key: getRestaurantKey(search), value: search.restaurants, expires: true});
};

Cache.prototype.getRestaurants = function(coordinates) {
  return this.data.get({key: getRestaurantKey(coordinates)});
};

Cache.prototype.getRestaurantsCacheTime = function() {
  return process.env[config.RESTAURANTS_CACHE_CONTROL_TIME_KEY];
};

Cache.prototype.setRestaurantsCacheTime = function(time) {
  this.data.set({key: keys.restaurantsCacheTime, value: time});
  process.env[config.RESTAURANTS_CACHE_CONTROL_TIME_KEY] = time;
};

const getRestaurantKey = ({latitude, longitude}) => {
  return `${keys.restaurantPrefix}_${latitude},${longitude}`;
};

const getUserKey = ({userId}) => {
  return `${keys.userPrefix}_${userId}`;
};

const cache = new Cache();

const loadRestaurantsCacheTime = async() => {
  const time = await cache.data.get({key: keys.restaurantsCacheTime});
  if (time === null) {
    cache.data.set({key: keys.restaurantsCacheTime, value: process.env[config.RESTAURANTS_CACHE_CONTROL_TIME_KEY]});
  } else {
    process.env[config.RESTAURANTS_CACHE_CONTROL_TIME_KEY] = time;
  }
};

loadRestaurantsCacheTime();

module.exports = cache;