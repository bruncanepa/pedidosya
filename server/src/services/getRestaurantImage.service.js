const {PY_RESTAURANT_LOGO_API_URL} = require('../config');
const {httpCustom} = require('../utils');
const {ResponseData} = require('../models');

module.exports = async ({name}) => {
  const url = `${PY_RESTAURANT_LOGO_API_URL}/${name}`;
  const {data, success} = await httpCustom.get({url, headers: {'Content-Type': 'image/jpeg'}});

  return new ResponseData({success, data: {image: data}});
};