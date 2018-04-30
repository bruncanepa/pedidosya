const {signIn} = require('../services');
const {AUTHORIZATION_HEADER} = require('../config');

const signInEndpoint = async(req, res) => {
  const result = await signIn(req.body);
  const {data, success} = result;

  if (success) {
    res.set(AUTHORIZATION_HEADER, data.sessionToken);
    res.send({success});
  } else {
    res.status(401).send(result);
  }
};

module.exports = (router) => {
  router.post('/', signInEndpoint);
  return router;
};