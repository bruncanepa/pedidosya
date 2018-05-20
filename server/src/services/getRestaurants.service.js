const {httpCustom, headers} = require('../utils');
const {ResponseData, Restaurant, Cache} = require('../models');
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

const getNotCached = async({result, token, lat, lng}) => {
  const searchKey = `${lat},${lng}`;
  const url = getURL({lat, lng});
  const request = {url, headers: headers.create(token)};
  const {success, data} = await httpCustom.get(request);
  
  if (success) {
    const restaurants = data.data
      .map(restaurant => new Restaurant(restaurant))
      .sort((a, b) => (b.rating - a.rating));
    
    result.success = true;
    result.message = '';
    result.data = {restaurants, latitude: lat, longitude: lng};
    
    Cache.addRestaurantSearch(result.data);
  }
};

module.exports = async({token, lat, lng}) => {
  const result = {success: false};
  const cachedRestaurants = await Cache.getRestaurants({latitude: lat, longitude: lng});

  if (cachedRestaurants) {
    result.success = true;
    result.message = '';
    result.data = {restaurants: cachedRestaurants, latitude: lat, longitude: lng};
  } else {
    await getNotCached({token, result, lat, lng});
  }

  return new ResponseData(result);
};