import {API_SERVER_URL} from '../config';
import {localStorage} from '../utils';

let userSession = '';
let userId = '';

const getHeaders = () => ({
  'Accept': 'application/json', 
  'Content-Type': 'application/json',
  'Authorization': getUserSession(),
  'X-User-Id': userId
});

const parseBody = (data) => (data && JSON.stringify(data));

const getURL = (url) => (`${API_SERVER_URL}/${url}`);

const updateCredentialsFromStorage = function() {
  if (!userSession) {
    const session = localStorage.loadState();
    session && setUserSession(session);
    const userId = localStorage.loadState(localStorage.USER_ID_KEY);
    userId && setUserId(userId);
  }
};

export const setUserSession = function(session = '') {
  userSession = session;
  return userSession;
};

export const getUserSession = function(session = '') {
  updateCredentialsFromStorage();
  return userSession;
};

export const setUserId = function(id = ''){
  userId = id;
  return userId;
};

export const getHttp = function(url) {
  return fetch(new Request(getURL(url), {
      method: 'GET',
      headers: new Headers(getHeaders())
    }))
    .then(response => response.json())
    .catch(error => error);
};

export const postHttp = function(url, data, options = {}) {
  return fetch(getURL(url), {
    method: 'POST',
    headers: getHeaders(),
    body: parseBody(data)
  }).then(async function(response) {
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

export const putHttp = function(url, data) {
  return fetch(getURL(url), {
    method: 'PUT',
    headers: getHeaders(),
      body: parseBody(data)
    })
    .then(response => response.json())
    .catch(error => error);
};

export const deleteHttp = function(url) {
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