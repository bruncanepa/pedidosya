const {PY_RESTAURANT_LOGO_API_URL} = require('../config');
const {httpCustom, images} = require('../utils');
const {ResponseData} = require('../models');


module.exports = async ({name}) => {
  const url = `${PY_RESTAURANT_LOGO_API_URL}/${name}`;
  const {data, success} = await httpCustom.get({url});

  const image = process.env.NODE_ENV === 'testing' ? name : images.encodeImage(data);

  return new ResponseData({success, data: {image}});
};