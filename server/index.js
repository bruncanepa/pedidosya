const express = require('express');
const compression = require('compression');

require('./src/extensions');
const api = require('./src/api');
const {SERVER_PORT} = require('./src/config');
const {importEnv, ExpressWrapper} = require('./src/utils');

const useMiddlewares = (app) => {
  app.use(compression());
  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
};

const useAPIEndpoints = (app) => {
  Object
    .keys(api)
    .forEach(route => {
      const router = express.Router();
      const wrapper = new ExpressWrapper(router).router;
      app.use(`/api/${route}`, api[route](wrapper));
    });
};

const run = async() => {
  const app = express();

  useMiddlewares(app);
  useAPIEndpoints(app);
  await importEnv();

  app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`);
  });
};

run();