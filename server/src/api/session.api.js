const {signIn} = require('../services');
const {APP_ID_HEADER, AUTHORIZATION_HEADER} = require('../config');

const signInEndpoint = async(req, res) => {
  const result = await signIn(req.body);
  const {data, success, status} = result;

  if (success) {
    res.set(AUTHORIZATION_HEADER, data.sessionToken);
    res.set(APP_ID_HEADER, data.appToken);
    res.send({success});
  } else {
    res.status(401).send(result);
  }
};

module.exports = (router) => {
  router.post('/', signInEndpoint);
  return router;
};