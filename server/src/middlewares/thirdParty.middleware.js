const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet())
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(compression());
};