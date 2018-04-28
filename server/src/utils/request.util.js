const http = require("http");

const createRequest = (options, callback) => {
  options.port = 80;
  
  http.request(options, response => {
    let output = '';

    response.setEncoding('utf8');

    response.on('data', chunk => {
      output += chunk;
    });

    response.on('end', () => {
      const obj = JSON.parse(output);
      callback(response.statusCode, obj);
    });
  });
};

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    const request = createRequest(options, resolve);

    request.on('error', (err) => {
      reject(err);
    });

    request.end();
  });
};