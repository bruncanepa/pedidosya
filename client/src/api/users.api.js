import {getHttp, setUserId} from './http';
import {localStorage} from '../utils';

const get = async () => {
  const {success, data} = await getHttp(`users`);
  const {id} = data.user;

  setUserId(id);
  localStorage.saveState(id, localStorage.USER_ID_KEY);
  
  return success ? data : {};
};

export default {
  get
};