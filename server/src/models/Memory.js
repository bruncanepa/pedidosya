function Memory() {
  const self = this;
  self.users = {/* userId: { sessions: {token} }*/};
  self.onlineUsers = 0;
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

module.exports = Memory;