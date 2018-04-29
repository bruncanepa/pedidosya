const {PY_API_URL, PY_API_TOKEN_URI} = require('../config');
const {http, ResponseData} = require('../utils');

module.exports = async() => {
  const result = await http.get({url: `${PY_API_URL}${PY_API_TOKEN_URI}`});
  return new ResponseData(Object.assign({}, result, {
    data: {
      appToken: result.data.access_token
    }
  }));
};