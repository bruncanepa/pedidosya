import querystring from 'querystring';

const AND_OPERATOR = '&';

export const parse = function(query = '') {
  const search = query.split('?')[1];
  return querystring.parse(search);
};

export const stringify = function(arrayQuery = [], data) {
  const query = arrayQuery.reduce((obj, key) => {
    obj[key] = data[key];
    return obj;
  }, {});

  return querystring.stringify(query);
};

export default {
  parse,
  stringify
};