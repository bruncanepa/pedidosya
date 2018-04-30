const {getRestaurants} = require('../services');
const {AUTHORIZATION_HEADER} = require('../config');
const {headers} = require('../utils');

const getEndpoint = async(req, res) => {
  const sessionToken = headers.get({req, key: AUTHORIZATION_HEADER});
  const {lat, lng} = req.query;
  
  const result = await getRestaurants({sessionToken, lat, lng});

  if (result.success) {
    res.send(result);
  } else {
    res.status(401).send(result);
  }
};

module.exports = (router) => {
  router.get('/', getEndpoint);
  return router;
};