const compression = require('compression');
const bodyParser = require('body-parser');

const {AUTHORIZATION_HEADER, APP_ID_HEADER} = require('../config');

module.exports = (app) => {
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', `Content-Type, Accept, ${AUTHORIZATION_HEADER}, ${APP_ID_HEADER}`);
    next();
  });
};