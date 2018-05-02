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
  const sessionToken = '';

  setUserSession(sessionToken);
  publish(events.SING_OUT);
  localStorage.removeState();
  
  return true;
};

export default {
  signIn,
  signOut
};