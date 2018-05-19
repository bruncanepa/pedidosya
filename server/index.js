const express = require('express');
const path = require('path');

const importEnv = require('./src/utils/importEnv.util');

importEnv()
  .then(() => {
    require('./src/api');
  });