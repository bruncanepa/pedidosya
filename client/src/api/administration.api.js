import {getHttp} from './http';

const getOnlineUsersCount = async() => {
  const result = await getHttp(`administration/onlineUsers`);
  return result; 
};


export default {
  getOnlineUsersCount
};