const uuid = require('../utils/uuid.util');
const redis = require('../utils/redis.util');

const RESTAURANTS_MAX_LAST_SEARCHES = 10;

const keys = {
  lastRestaurantsSearches: 'last_restaurants_searches',
  onlineUsers: 'online_users',
  restaurant: 'restaurant',
  user: 'user'
};

function Cache() {
  const self = this;
  self.users = {/* userId: { sessions: {token} }*/};
  self.onlineUsers = 0;
  self.restaurants = redis();
};

Cache.prototype.getUser = function(userId) {
  return this.users[userId];
};

Cache.prototype.getSession = function({userId, token}) {
  const user = this.getUser(userId);
  return user && user.sessions[token];
};

Cache.prototype.addSession = function({userId, token}){
  let user = this.getUser(userId);
  if (user) {
    user.sessions[token] = token;
  } else {
    this.onlineUsers++;
    user = this.users[userId] = {sessions: {[token]: token}};
  }
  return this.onlineUsers;
};

Cache.prototype.removeSession = function({userId, token}) {
  const user = this.getUser(userId);
  
  if (user) {
    delete user.sessions[token];
    if (Object.keys(user.sessions).length == 0) {
      this.onlineUsers--;
      delete this.users[userId]
    }
  }
  return this.onlineUsers;
};

Cache.prototype.isValidSession = function({userId, token}) { 
  return !!this.getSession({userId, token});
};

Cache.prototype.getOnlineUsersCount = function() {
  return this.onlineUsers;
};

Cache.prototype.getRestaurantsLastSearches = function() {
  return this.restaurants.getList({key: keys.lastRestaurantsSearches});
};

Cache.prototype.addRestaurantSearch = async function(search) {
  const searches = await this.restaurants.getList({key: keys.lastRestaurantsSearches});

  if (searches.length >= RESTAURANTS_MAX_LAST_SEARCHES) {
    this.restaurants.leftPop({key: keys.lastRestaurantsSearches});
  }

  const {latitude, longitude} = search;
  const value = {id: uuid('search'), latitude, longitude};

  this.restaurants.rightPush({key: keys.lastRestaurantsSearches, value});
  this.restaurants.set({key: getRestaurantKey(search), value: search.restaurants});
};

Cache.prototype.getRestaurants = function(coordinates) {
  return this.restaurants.get({key: getRestaurantKey(coordinates)});
};

const getRestaurantKey = ({latitude, longitude}) => {
  return `${keys.restaurant}_${latitude},${longitude}`;
};

const getUserKey = ({userId}) => {
  return `${keys.user}_${userId}`;
};

const cache = new Cache();

module.exports = cache;