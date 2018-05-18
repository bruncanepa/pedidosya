import {postHttp, setUserSession} from './http';
import {localStorage, publishSubscribe} from '../utils';

const {events, publish} = publishSubscribe;

const signIn = async (form) => {
  const {body, headers} = await postHttp(`session`, {...form}, {headers: true});

  if (body.success) {
    const {sessionToken} = body.data;
    setUserSession(sessionToken);
    publish(events.SIGN_IN, sessionToken);
    localStorage.saveState(sessionToken);
  }

  return body;
};

const signOut = async () => {
  setUserSession();
  publish(events.SING_OUT);
  localStorage.removeState();
  localStorage.removeState(localStorage.USER_ID_KEY);
  
  return true;
};

export default {
  signIn,
  signOut
};