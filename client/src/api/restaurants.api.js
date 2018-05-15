import {getHttp} from './http';
import {publishSubscribe} from '../utils';

const {events, publish} = publishSubscribe;

const getAll = async({latitude, longitude}) => {
  let url = 'restaurants?';

  if (latitude) url = `${url}lat=${latitude}&`;
  if (longitude) url = `${url}lng=${longitude}`;
  
  const {success, data} = await getHttp(url);

  return {success, data, latitude, longitude};
};

const getImage = async({logo}) => {
  const {success, data} = await getHttp(`restaurants/image/${logo}`);
  return success ? data.image : '';
};

export default {
  getAll,
  getImage
};