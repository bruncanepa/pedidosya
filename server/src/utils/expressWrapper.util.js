
const asyncRequestHandler = callback => (req, res, next) => {
  Promise
      .resolve(callback(req, res, next))
      .catch(error => {
          next(error);
      });
};

function WrappedRouter(router) {
  const self = this;
  self.router = router;
}

WrappedRouter.prototype.post = function (route, callback) {
  this.router.post(route, asyncRequestHandler(callback))
};

WrappedRouter.prototype.put = function (route, callback) {
  this.router.put(route, asyncRequestHandler(callback))
};

WrappedRouter.prototype.get = function (route, callback) {
  this.router.get(route, asyncRequestHandler(callback))
};

WrappedRouter.prototype.delete = function (route, callback) {
  this.router.delete(route, asyncRequestHandler(callback))
};

module.exports = WrappedRouter;