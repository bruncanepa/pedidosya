const authorize = require('../middlewares/authorize.middleware');
const {httpCustom} = require('../utils');
const {ResponseData} = require('../models');
const dictionary = require('../localization');

const {statusCodes} = httpCustom;

const errorHandler = (res) => (error) => {
  process.env.NODE_ENV != 'production' && console.log(error);
  const result = new ResponseData({message: dictionary.genericError});
  res.status(statusCodes.BAD_REQUEST).send(result);
};

const asyncRequestHandler = (...handlers) => (
  handlers
    .map(handler => (req, res, next) => {
      Promise
        .resolve(handler(req, res, next))
        .catch(errorHandler(res))
    })
);

const defaultOptions = {authorize: true};

const getHandlers = ({options  = defaultOptions, handler}) => {
  const handlers = [handler];
  if (options.authorize) {
    handlers.unshift(authorize);
  }
  return asyncRequestHandler(...handlers);
};

function ExpressWrapper(router) {
  const self = this;
  self.router = router;
}

ExpressWrapper.prototype.post = function(route, handler, options) {
  this.router.post(route, ...getHandlers({options, handler}));
};

ExpressWrapper.prototype.put = function(route, handler, options) {
  this.router.put(route, ...getHandlers({options, handler}));
};

ExpressWrapper.prototype.get = function(route, handler, options) {
  this.router.get(route, ...getHandlers({options, handler}));
};

ExpressWrapper.prototype.delete = function(route, handler, options) {
  this.router.delete(route, ...getHandlers({options, handler}));
};

module.exports = ExpressWrapper;