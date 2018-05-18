const redis = require('redis');

const {RESTAURANTS_CACHE_CONTROL_TIME_KEY} = require('../config');

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

const set = (client) => ({key, value, expires = false}) => {
  const expirationTime = process.env[RESTAURANTS_CACHE_CONTROL_TIME_KEY];
  const parsedValue = JSON.stringify(value);

  if (expires) {
    client.setex(key, expirationTime, parsedValue);
  } else {
    client.set(key, parsedValue);
  }
};

const get = (client) => ({key}) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      err ? reject(err) : resolve(JSON.parse(reply));
    });
  });
};

const getList = (client) => ({key}) => {
  return new Promise((resolve, reject) => {
    client.lrange(key, 0, -1, (err, reply) => {
      err ? reject(err) : resolve(reply.map(value => JSON.parse(value)));
    });
  });
};

const rightPush = (client) => ({key, value}) => {
  return new Promise((resolve, reject) => {
    client.rpush(key, JSON.stringify(value), (err, reply) => {
      err ? reject(err) : resolve(reply);
    });
  });
};

const leftPop = (client) => ({key}) => {
  return new Promise((resolve, reject) => {
    client.lpop(key, (err, reply) => {
      err ? reject(err) : resolve(reply);
    });
  });
};

module.exports = () => {
  const client = connect();
  return { 
    set: set(client),
    get: get(client),
    getList: getList(client),
    rightPush: rightPush(client),
    leftPop: leftPop(client)
  };
};