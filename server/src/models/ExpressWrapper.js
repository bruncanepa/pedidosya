const {httpCustom} = require('../utils');

const {statusCodes} = httpCustom;

const asyncRequestHandler = callback => (req, res, next) => {
  Promise
    .resolve(callback(req, res, next))
    .catch(error => {
      console.log(error);
      res.status(statusCodes.BAD_REQUEST).send(error);
    });
};

function ExpressWrapper(router) {
  const self = this;
  self.router = router;
}

ExpressWrapper.prototype.post = function (route, callback) {
  this.router.post(route, asyncRequestHandler(callback))
};

ExpressWrapper.prototype.put = function (route, callback) {
  this.router.put(route, asyncRequestHandler(callback))
};

ExpressWrapper.prototype.get = function (route, callback) {
  this.router.get(route, asyncRequestHandler(callback))
};

ExpressWrapper.prototype.delete = function (route, callback) {
  this.router.delete(route, asyncRequestHandler(callback))
};

module.exports = ExpressWrapper;