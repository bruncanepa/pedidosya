const fs = require('fs');

module.exports = ({path}) => {
  return new Promise((resolve) => {
    fs.exists(path, (exists) => {
      resolve(exists);
    })
  });
};