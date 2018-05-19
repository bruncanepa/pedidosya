const redis = require('redis');

const {RESTAURANTS_CACHE_CONTROL_TIME_KEY} = require('../config');

function Redis() {
  const self = this;
  self.client = connect();
};

const connect = () => {
  const client = redis.createClient();

  client.on('connect', () => {
    console.log(`Redis: Listening`);
  });
  
  client.on('error', (err) => {
    console.log(err);
  });

  return client;
};

const callback = ({map, resolve, reject}) => (err, reply) => {
  return err ? reject(err) : resolve(map ? map(reply) : reply);
};

Redis.prototype.set = function({key, value, expires = false}) {
  const expirationTime = process.env[RESTAURANTS_CACHE_CONTROL_TIME_KEY] || 60;
  const parsedValue = JSON.stringify(value);

  if (expires) {
    this.client.setex(key, expirationTime, parsedValue);
  } else {
    this.client.set(key, parsedValue);
  }
};

Redis.prototype.get = function({key}) {
  const {client} = this;
  return new Promise((resolve, reject) => {
    client.get(key, callback({map: JSON.parse, resolve, reject}));
  });
};

Redis.prototype.remove = function({key}) {
  const {client} = this;
  return new Promise((resolve, reject) => {
    client.del(key, callback({resolve, reject}));
  });
};

Redis.prototype.getList = function({key}) {
  const {client} = this;
  const map = (reply) => reply.map(value => JSON.parse(value));
  return new Promise((resolve, reject) => {
    client.lrange(key, 0, -1, callback({resolve, reject, map}));
  });
};

Redis.prototype.rightPush = function({key, value}) {
  const {client} = this;
  return new Promise((resolve, reject) => {
    client.rpush(key, JSON.stringify(value), callback({resolve, reject}));
  });
};

Redis.prototype.leftPop = function({key}) {
  const {client} = this;
  return new Promise((resolve, reject) => {
    client.lpop(key, callback({resolve, reject}));
  });
};

Redis.prototype.setHash = function({key, value}) {
  const {client} = this;
  return new Promise((resolve, reject) => {
    client.hmset(key, value, callback({resolve, reject}));
  });
};

Redis.prototype.getHash = function({key}) {
  const {client} = this;
  return new Promise((resolve, reject) => {
    client.hgetall(key, callback({resolve, reject}));
  });
};

Redis.prototype.updateHash = function({key, field, value}) {
  const {client} = this;
  return new Promise((resolve, reject) => {
    client.hset(key, field, value, callback({resolve, reject}));
  });
};

Redis.prototype.deleteHashField = function({key, field}) {
  const {client} = this;
  return new Promise((resolve, reject) => {
    client.hdel(key, field, callback({resolve, reject}));
  });
};

module.exports = Redis;