const {ResponseData} = require('../models');

module.exports = async() => {
  return new ResponseData({success: true});
};