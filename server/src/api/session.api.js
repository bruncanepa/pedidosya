const {signIn, signOut} = require('../services');
const {AUTHORIZATION_HEADER, USER_ID_HEADER} = require('../config');
const {httpCustom, headers} = require('../utils');
const {statusCodes} = httpCustom;

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

const signOutEndpoint = async(req, res) => {
  const token = headers.get({req, key: AUTHORIZATION_HEADER});
  const userId = headers.get({req, key: USER_ID_HEADER});

  const result = await signOut({token, userId});

  res.send(result);
};

module.exports = (router) => {
  router.post('/', signInEndpoint);
  router.delete('/', signOutEndpoint);
  return router;
};