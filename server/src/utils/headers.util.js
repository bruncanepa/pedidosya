const {AUTHORIZATION_HEADER} = require('../config');

module.exports = (token) => ({[AUTHORIZATION_HEADER]: token});