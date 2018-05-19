const express = require('express');
const path = require('path');

require('../extensions');

const {SERVER_PORT} = require('../config');
const useMiddlewares = require('../middlewares');

const app = express();

useMiddlewares(app);

app.listen(SERVER_PORT, () => {
  console.log(`NodeJs: Listening on port: ${SERVER_PORT}`);
});

module.exports = app;