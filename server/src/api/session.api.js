const {signIn} = require('../services');
const {AUTHORIZATION_HEADER} = require('../config');
const {http} = require('../utils');
const {statusCodes} = http;

const signInEndpoint = async(req, res) => {
  const result = await signIn(req.body);
  const {data, success} = result;

  if (success) {
    res.set(AUTHORIZATION_HEADER, data.sessionToken);
    res.set('Access-Control-Expose-Headers', AUTHORIZATION_HEADER);
    res.send({success, data});
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(result);
  }
};

module.exports = (router) => {
  router.post('/', signInEndpoint);
  return router;
};