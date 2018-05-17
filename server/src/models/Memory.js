const uuid = require('../utils/uuid.util');

const RESTAURANTS_MAX_SEARCHES = 10;

function Memory() {
  const self = this;
  self.users = {/* userId: { sessions: {token} }*/};
  self.onlineUsers = 0;
  self.restaurants = {searches: [/*{latitude, longitude, id}*/]};
};

Memory.prototype.addSession = function({userId, token}){
  let user = this.users[userId];
  if (user) {
    user.sessions[token] = token;
  } else {
    this.onlineUsers++;
    user = this.users[userId] = {sessions: {[token]: token}};
  }
  return this.onlineUsers;
};

Memory.prototype.removeSession = function({userId, token}) {
  const user = this.users[userId];
  if (user) {
    delete user.sessions[token];
    if (Object.keys(user.sessions).length == 0) {
      this.onlineUsers--;
      delete this.users[userId]
    }
  }
  return this.onlineUsers;
};

Memory.prototype.getOnlineUsersCount = function() {
  return this.onlineUsers;
};

Memory.prototype.getRestaurantsLastSearches = function() {
  return this.restaurants.searches;
};

Memory.prototype.addRestaurantSearch = function(search) {
  const {searches} = this.restaurants;
  searches.length >= RESTAURANTS_MAX_SEARCHES && searches.shift();
  searches.push(Object.assign(search, {id: uuid('search')}));
};

const memory = new Memory();

module.exports = memory;