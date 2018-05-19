import {postHttp, deleteHttp} from './http';
import {signOut as signOutState, signIn as signInState} from '../state';

const signIn = async(form) => {
  const {body, headers} = await postHttp(`session`, {...form}, {headers: true});
  if (body.success) {
    const {sessionToken} = body.data;
    signInState(sessionToken);
  }
  return body;
};

const signOut = () => {
  deleteHttp('session');
  signOutState();
  return true;
};

export default {
  signIn,
  signOut
};