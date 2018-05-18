const express = require('express');
const path = require('path');

require('./src/extensions');
const importEnv = require('./src/utils/importEnv.util');

importEnv()
  .then(result => {
    const api = require('./src/api');
    const {SERVER_PORT} = require('./src/config');
    const useMiddlewares = require('./src/middlewares');

    const run = () => {
      const app = express();

      useMiddlewares(app);

      app.listen(SERVER_PORT, () => {
        console.log(`NodeJs: Listening on port: ${SERVER_PORT}`);
      });
    };

    run();
  });