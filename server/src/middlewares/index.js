const thirdParty = require('./thirdParty.middleware');
const headers = require('./headers.middleware');
const endpoints = require('./endpoints.middleware');

module.exports = (app) => {
  thirdParty(app);
  headers(app);
  endpoints(app);
};