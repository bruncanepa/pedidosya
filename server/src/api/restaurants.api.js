const {getRestaurantImage, getRestaurants} = require('../services');
const {AUTHORIZATION_HEADER, USER_ID_HEADER} = require('../config');
const {headers, httpCustom} = require('../utils');
const {statusCodes} = httpCustom;

const DEFAULT_COORDINATE_VALUE = '0'

const getCoordinateValue = (value = DEFAULT_COORDINATE_VALUE) => value;

const getEndpoint = async(req, res) => {
  const token = headers.get({req, key: AUTHORIZATION_HEADER});
  const {lat, lng} = req.query;
  
  const result = await getRestaurants({token, lat: getCoordinateValue(lat) , lng: getCoordinateValue(lng)});

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