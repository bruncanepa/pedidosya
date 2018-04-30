const {AUTHORIZATION_HEADER} = require('../config');

module.exports = {
  create: token => ({[AUTHORIZATION_HEADER]: token}),
  get: ({req, key}) => req.auth[key]
};