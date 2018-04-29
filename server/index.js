const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

require('./src/extensions');
const {importEnv} = require('./src/utils');

importEnv()
  .then(result => {
    const api = require('./src/api');
    const {SERVER_PORT} = require('./src/config');
    const {ExpressWrapper} = require('./src/utils');

    const useMiddlewares = (app) => {
      app.use(compression());
      app.use(bodyParser.urlencoded({extended: true}));
      app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
        next();
      });
    };

    const useAPIEndpoints = (app) => {
      Object
        .keys(api)
        .forEach(route => {
          const router = express.Router();
          const wrapper = new ExpressWrapper(router);
          app.use(`/api/${route}`, api[route](wrapper).router);
        });
    };

    const run = () => {
      const app = express();

      useMiddlewares(app);
      useAPIEndpoints(app);

      app.listen(SERVER_PORT, () => {
        console.log(`Listening on port: ${SERVER_PORT}`);
      });
    };

    run();
  });