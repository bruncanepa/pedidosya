const {APP_ID_HEADER, AUTHORIZATION_HEADER} = require('../config');

module.exports = (app) => {
  app.use((req, res, next) => {
    req.auth = {
      [APP_ID_HEADER]: req.headers[APP_ID_HEADER.toLowerCase()],
      [AUTHORIZATION_HEADER]: req.headers[AUTHORIZATION_HEADER.toLowerCase()]
    };
    next();
  });
};