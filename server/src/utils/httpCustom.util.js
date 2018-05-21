const axios = require('axios');
const fs = require('fs');  

const config = require('../config');
const {ResponseData} = require('../models');

module.exports = {
  get: async({url, headers = {}}) => {
    const instance = axios.create({
      baseURL: url,
      headers: headers
    });

    let {data, status} = await instance
      .get(url)
      .catch(error => {
        return new ResponseData({status: error.nested(['response', 'satus'])});
      });

    return new ResponseData({data, success: status == 200, status});
  },
  getImage: async({url, filePath}) => {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(filePath));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
        resolve(new ResponseData({success: true}));
      })

      response.data.on('error', () => {
        reject(new ResponseData({success: false}));
      })
    })
  },
  statusCodes: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  }
};