const uuid = require('../utils/uuid.util');
const redis = require('../utils/redis.util');

const RESTAURANTS_MAX_SEARCHES = 10;

function Cache() {
  const self = this;
  self.users = {/* userId: { sessions: {token} }*/};
  self.onlineUsers = 0;
  self.restaurants = {searches: [/*{latitude, longitude, id}*/], data: redis()};
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
  return this.restaurants.searches;
};

Cache.prototype.addRestaurantSearch = function(search) {
  const {searches} = this.restaurants;
  searches.length >= RESTAURANTS_MAX_SEARCHES && searches.shift();
  searches.push(Object.assign(search, {id: uuid('search')}));
  this.restaurants.data.add({key: getSearchKey(search), value: search.restaurants});
};

Cache.prototype.getRestaurants = function(coordinates) {
  return this.restaurants.data.get({key: getSearchKey(coordinates)});
};

const getSearchKey = ({latitude, longitude}) => {
  return `${latitude},${longitude}`;
};

const memory = new Cache();

module.exports = memory;