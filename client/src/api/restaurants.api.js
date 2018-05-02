import {getHttp} from './http';
import {publishSubscribe} from '../utils';

const {events, publish} = publishSubscribe;

const getAll = async({latitude, longitude}) => {
  const {success, data} = await getHttp(`restaurants?lat=${latitude}&lng=${longitude}`);

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