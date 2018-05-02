import {getHttp} from './http';

const getAll = async({latitude, longitude}) => {
  const {success, data} = await getHttp(`restaurants?lat=${latitude}&lng=${longitude}`);

  if (success) {
    console.log(success)
  }
};

const getImage = async({logo}) => {
  const {success, data} = await getHttp(`restaurants/image/${logo}`);
  return success ? data.image : '';
};

export default {
  getAll,
  getImage
};