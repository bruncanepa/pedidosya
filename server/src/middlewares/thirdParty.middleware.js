const compression = require('compression');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: true}));
};