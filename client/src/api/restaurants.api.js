import {getHttp, getImage as getHttpImage} from './http';
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
  const result = await getHttpImage(`restaurants/image/${logo}`);
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(result);
  return imageUrl;
};

export default {
  getAll,
  getImage
};