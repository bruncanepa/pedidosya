import {localStorage, publishSubscribe} from '../utils';

const {publish, events} = publishSubscribe;

let userSession = '';
let userId = '';

const updateCredentialsFromStorage = function() {
  if (!userSession) {
    const session = localStorage.loadState();
    session && setUserSession(session);
    const userId = localStorage.loadState(localStorage.USER_ID_KEY);
    userId && setUserId(userId);
  }
};

const setUserSession = function(session = '') {
  userSession = session;
  return userSession;
};

export const getUserSession = function(session = '') {
  updateCredentialsFromStorage();
  return userSession;
};

export const getUserId = function() {
  return userId;
};

export const setUserId = function(id = ''){
  userId = id;
  localStorage.saveState(id, localStorage.USER_ID_KEY);
  return userId;
};

export const signIn = function(token) {
  setUserSession(token);
  localStorage.saveState(token);
  publish(events.SIGN_IN, token);
};

export const signOut = function() {
  setUserId();
  setUserSession();
  localStorage.removeState();
  publish(events.SING_OUT);
};