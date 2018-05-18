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

const add = (client) => ({key, value, expires = true}) => {
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

module.exports = () => {
  const client = connect();
  return { 
    add: add(client),
    get: get(client),
    keys: {
      lastRestaurantsSearches: 'last_restaurants_searches',
      onlineUsers: 'online_users'
    }
  };
};