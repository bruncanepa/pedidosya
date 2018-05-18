const {AUTHORIZATION_HEADER, USER_ID_HEADER } = require('../config');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', `Content-Type, Accept, ${AUTHORIZATION_HEADER}, ${USER_ID_HEADER}`);
    res.header('Access-Control-Expose-Headers', AUTHORIZATION_HEADER);
    req.auth = {
      [AUTHORIZATION_HEADER]: req.headers[AUTHORIZATION_HEADER.toLowerCase()],
      [USER_ID_HEADER]: req.headers[USER_ID_HEADER.toLowerCase()]
    };
    next();
  });
};