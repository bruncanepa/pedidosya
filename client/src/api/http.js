import {API_SERVER_URL} from '../config';
import {signOut, getUserId, setUserId, getUserSession} from '../state';

const getHeaders = () => ({
  'Accept': 'application/json', 
  'Content-Type': 'application/json',
  'Authorization': getUserSession(),
  'X-User-Id': getUserId()
});

const statusCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

const parseBody = (data) => (data && JSON.stringify(data));

const getURL = (url) => (`${API_SERVER_URL}/${url}`);

const handleResponse = (response) => {
  const {status} = response;
  if (status == statusCodes.UNAUTHORIZED) {
    signOut();
  }
  return response.json();
};

const handleError = (error) => error;

export const getImage = function(url) {
  return fetch(new Request(getURL(url), {
    method: 'GET',
    headers: new Headers(getHeaders())
  }))
  .then(response => {
    return response.blob()
  })
  .catch(handleError);
};

export const getHttp = function(url) {
  return fetch(new Request(getURL(url), {
      method: 'GET',
      headers: new Headers(getHeaders())
    }))
    .then(handleResponse)
    .catch(handleError);
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
  }).catch(handleError);
};

export const putHttp = function(url, data) {
  return fetch(getURL(url), {
    method: 'PUT',
    headers: getHeaders(),
      body: parseBody(data)
    })
    .then(handleResponse)
    .catch(handleError);
};

export const deleteHttp = function(url) {
  return fetch(getURL(url), {
      method: 'DELETE',
      headers: getHeaders()
    })
    .then(handleResponse)
    .catch(handleError);
};