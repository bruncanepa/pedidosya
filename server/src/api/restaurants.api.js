const {getRestaurantImage, getRestaurants} = require('../services');
const {AUTHORIZATION_HEADER} = require('../config');
const {headers} = require('../utils');
const {http} = require('../utils');
const {statusCodes} = http;

const DEFAULT_COORDINATE_VALUE = '0'

const getCoordinateValue = (value = DEFAULT_COORDINATE_VALUE) => value;

const getEndpoint = async(req, res) => {
  const sessionToken = headers.get({req, key: AUTHORIZATION_HEADER});
  const {lat, lng} = req.query;
  
  const result = await getRestaurants({sessionToken, lat: getCoordinateValue(lat) , lng: getCoordinateValue(lng)});

  if (result.success) {
    res.send(result);
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(result);
  }
};

const getImageEndpoint = async (req, res) => {
  const {name} = req.params;
  
  const result = await getRestaurantImage({name});

  if (result.success) {
    res.send(result);
  } else {
    res.status(statusCodes.NOT_FOUND).send(result);
  }
};

module.exports = (router) => {
  router.get('/', getEndpoint);
  router.get('/image/:name', getImageEndpoint);
  return router;
};