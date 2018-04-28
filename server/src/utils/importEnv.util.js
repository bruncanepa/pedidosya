const path = require('path');
const readFile = require('./readFile.util');

module.exports = (path = `../.env`) => {
  return readFile(path)
    .then(file => {
      const variables = {};
      file
        .split('\n')
        .forEach(line => {
          const [key, value] = line.split('=');
          process.env[key] = value;
          variables[key] = value;
        });
      return variables;
    });
};