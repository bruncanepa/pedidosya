const {PY_RESTAURANT_LOGO_API_URL, RESTAURANTS_IMAGES_PATH} = require('../config');
const {httpCustom, images, readFile, fileExists} = require('../utils');
const {ResponseData} = require('../models');

const getImagePath = ({name}) => `${RESTAURANTS_IMAGES_PATH}${name}`;

const imageExists = ({name}) => {
  const path = getImagePath({name});
  return fileExists({path});
};

module.exports = async ({name}) => {
  const url = `${PY_RESTAURANT_LOGO_API_URL}/${name}`;
  const exists = await imageExists({name});
  const path = getImagePath({name});
  const data = {path};
  if (exists && process.env.NODE_ENV != 'testing') {
    return new ResponseData({data, success: true});
  } else {
    const {success} = await httpCustom.getImage({url, filePath: path});
    return new ResponseData({success, data});
  }
};