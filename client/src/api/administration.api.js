import {getHttp} from './http';

const getAdminInfo = async() => {
  const result = await getHttp(`administration/`);
  return result; 
};


export default {
  getAdminInfo
};