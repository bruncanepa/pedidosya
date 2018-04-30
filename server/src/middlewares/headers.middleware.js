const {AUTHORIZATION_HEADER} = require('../config');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', `Content-Type, Accept, ${AUTHORIZATION_HEADER}`);
    req.auth = {
      [AUTHORIZATION_HEADER]: req.headers[AUTHORIZATION_HEADER.toLowerCase()]
    };
    next();
  });
};