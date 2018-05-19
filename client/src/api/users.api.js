import {getHttp} from './http';
import {setUserId} from '../state';

const get = async () => {
  const {success, data} = await getHttp(`users`);
  setUserId(data.user.id);
  return success ? data : {};
};

export default {
  get
};