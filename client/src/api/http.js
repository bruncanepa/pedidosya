import {API_SERVER_URL} from '../config';

const getHeaders = () => ({'Accept': 'application/json', 'Content-Type': 'application/json'});

const parseBody = (data) => (data && JSON.stringify(data));

const getURL = (url) => (`${API_SERVER_URL}/${url}`);

export const getHttp = (url) => {
  return fetch(new Request(getURL(url), {
      method: 'GET',
      headers: new Headers(getHeaders())
    }))
    .then(response => response.json())
    .catch(error => error);
};

export const postHttp = (url, data) => {
  return fetch(getURL(url), {
      method: 'POST',
      headers: getHeaders(),
      body: parseBody(data)
    })
    .then(response => response.json())
    .catch(error => error);
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