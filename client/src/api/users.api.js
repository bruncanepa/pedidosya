import {getHttp} from './http';

const get = async ({latitude, longitude}) => {
  const {success, data} = await getHttp(`users`);

  if (success) {
    console.log(success)
  }
};

export default {
  get
};