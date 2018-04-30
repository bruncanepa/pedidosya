const express = require('express');

const api = require('../api');
const {ExpressWrapper} = require('../models');;

module.exports = (app) => {
  Object
    .keys(api)
    .forEach(route => {
      const router = express.Router();
      const wrapper = new ExpressWrapper(router);
      app.use(`/api/${route}`, api[route](wrapper).router);
    });
};;