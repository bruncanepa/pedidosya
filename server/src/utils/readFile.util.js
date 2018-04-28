const fs = require('fs');
const path = require('path');

module.exports = (name) => {
  return new Promise((resolve, reject) => {
    const file = path.resolve(__dirname, name);
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
