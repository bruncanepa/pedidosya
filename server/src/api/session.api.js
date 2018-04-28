const {signIn} = require('../services');

const signInEndpoint = async(req, res) => {
  const result = await signIn(req.body);
  res.send(result);
};

module.exports = (router) => {
  router.post('/', signInEndpoint);
  return router;
};