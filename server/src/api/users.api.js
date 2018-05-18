const {getUser} = require('../services');
const {AUTHORIZATION_HEADER} = require('../config');
const {headers} = require('../utils');
const {http} = require('../utils');
const {statusCodes} = http;

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
  router.get('/', getEndpoint);
  return router;
};