const fs = require('fs');
const path = require('path');

module.exports = ({name, async = true}) => {
  const file = path.resolve(__dirname, name);
  return async ?
    new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, data) => {
        err ? reject(err) : resolve(data);
      });
    }) :
    fs.readFileSync(file, 'utf8');
};
