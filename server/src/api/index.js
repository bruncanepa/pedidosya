const express = require('express');
const path = require('path');

const importEnv = require('../utils/importEnv.util');
const {importArgs} = require('../utils/terminal.util');

require('../extensions');
importEnv();
importArgs();

const {SERVER_PORT} = require('../config');
const useMiddlewares = require('../middlewares');

const app = express();

useMiddlewares(app);

app.listen(SERVER_PORT, () => {
  console.log(`NodeJs: Listening on port: ${SERVER_PORT}`);
});

module.exports = app;