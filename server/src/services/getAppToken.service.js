const {PY_API_TOKEN_URI} = require('../config');
const {httpCustom} = require('../utils');
const {ResponseData} = require('../models');

const url = PY_API_TOKEN_URI;

module.exports = async() => {
  const result = await httpCustom.get({url});
  return new ResponseData(Object.assign({}, result, {
    data: {
      appToken: result.data.access_token
    }
  }));
};