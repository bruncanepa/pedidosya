const {getUser} = require('../services');
const {AUTHORIZATION_HEADER, USER_ID_HEADER} = require('../config');
const {headers,httpCustom} = require('../utils');

const {statusCodes} = httpCustom;

const getEndpoint = async(req, res) => {
  const token = headers.get({req, key: AUTHORIZATION_HEADER});
  const result = await getUser({token});

  if (result.success) {
    res.send(result);
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(result);
  }
};

module.exports = (router) => {
  router.get('/', getEndpoint, {authorize: false});
  return router;
};