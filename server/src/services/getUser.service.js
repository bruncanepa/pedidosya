const {PY_API_URL, PY_GET_USER_URI} = require('../config');
const {http, headers} = require('../utils');
const {ResponseData} = require('../models');

module.exports = async({sessionToken}) => {
  const result = await http.get({url: `${PY_API_URL}${PY_GET_USER_URI}`, headers: headers(sessionToken)});

  if (success) {} else {}

};