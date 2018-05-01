import {getHttp} from './http';

const getAll = async ({latitude, longitude}) => {
  const {success, data} = await getHttp(`restaurants?lat=${latitude}&lng=${longitude}`);

  if (success) {
    console.log(success)
  }

};

export default {
  getAll
};