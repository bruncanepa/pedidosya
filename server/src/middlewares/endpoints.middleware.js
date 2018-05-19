const express = require('express');

const routes = require('../api/routes');
const ExpressWrapper = require('../models/ExpressWrapper');;

module.exports = (app) => {
  Object
    .keys(routes)
    .forEach(route => {
      const router = express.Router();
      const wrapper = new ExpressWrapper(router);
      app.use(`/api/${route}`, routes[route](wrapper).router);
    });
};;