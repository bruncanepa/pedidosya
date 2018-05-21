import {getHttp, putHttp} from './http';
import dictionary from '../localization';

const getAdminInfo = function() {
  return getHttp(`administration/`);
};

const setRestaurantsCacheTime = async function(data){
  const result = await putHttp(`administration/`, data);
  if (result.success) {
    result.message = dictionary.administration.restaurantsCacheTime.success;
  }
  return result;
};

export default {
  getAdminInfo,
  setRestaurantsCacheTime
};