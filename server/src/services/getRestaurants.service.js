const {http, headers} = require('../utils');
const {ResponseData, Restaurant} = require('../models');
const {PY_GET_RESTAURANTS_URI} = require('../config');
const dictionary = require('../localization');

const baseURL = PY_GET_RESTAURANTS_URI;
const country = 1;
const offset = 0;
const limit = 20;
const fields = 'name,topCategories,ratingScore,logo,deliveryTimeMaxMinutes,link';
const sort = 'rating';

const getURL = ({lat, lng}) => {
  return `${baseURL}?country=${country}&point=${lat},${lng}&offset=${offset}&max=${limit}&sort=${sort}&fields=${fields}`;
};

module.exports = async({sessionToken, lat, lng}) => {
  const result = {success: false, message: dictionary.invalidSessionToken};
  const url = getURL({lat, lng});
  const request = {url, headers: headers.create(sessionToken)};
  
  const {success, data} = await http.get(request);

  if (success) {
    result.success = true;
    result.message = '';
    result.data = {
      restaurants: data.data
        .map(restaurant => new Restaurant(restaurant))
        .sort((a, b) => (b.rating - a.rating))
    };
  }

  return new ResponseData(result);
};