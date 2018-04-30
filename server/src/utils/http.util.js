const axios = require('axios');
const {ResponseData} = require('../models');

module.exports = {
  get: async({url, headers = {}}) => {
    const instance = axios.create({
      baseURL: url,
      headers: headers
    });

    const {data, status} = await instance
      .get(url)
      .catch(error => {
        return new ResponseData({status: error.nested(['response', 'satus'])});
      });

    return new ResponseData({data, success: status == 200, status });
  }
};