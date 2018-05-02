import {API_SERVER_URL} from '../config';
import {localStorage} from '../utils';

let userSession = '';

const getHeaders = () => ({
  'Accept': 'application/json', 
  'Content-Type': 'application/json',
  'Authorization': getUserSession()
});

const parseBody = (data) => (data && JSON.stringify(data));

const getURL = (url) => (`${API_SERVER_URL}/${url}`);

const updateUserSessionFromStorage = () => {
  if (!userSession) {
    const session = localStorage.loadState();
    session && setUserSession(session);
  }
};

export const setUserSession = (session = '') => {
  userSession = session;
  return userSession;
};

export const getUserSession = (session = '') => {
  updateUserSessionFromStorage();
  return userSession;
};

export const getHttp = (url) => {
  return fetch(new Request(getURL(url), {
      method: 'GET',
      headers: new Headers(getHeaders())
    }))
    .then(response => response.json())
    .catch(error => error);
};

export const postHttp = (url, data, options = {}) => {
  return fetch(getURL(url), {
    method: 'POST',
    headers: getHeaders(),
    body: parseBody(data)
  }).then(async response => {
    const body = await response.json();
    const {headers} = options;
    return headers
      ? {
        body,
        headers: response.headers
      }
      : body;
  }).catch(error => error);
};

export const putHttp = (url, data) => {
  return fetch(getURL(url), {
    method: 'PUT',
    headers: getHeaders(),
      body: parseBody(data)
    })
    .then(response => response.json())
    .catch(error => error);
};

export const deleteHttp = (url) => {
  return fetch(getURL(url), {
      method: 'DELETE',
      headers: getHeaders()
    })
    .then(response => response.json())
    .catch(error => error);
};

export default {
  getUserSession,
  setUserSession
};