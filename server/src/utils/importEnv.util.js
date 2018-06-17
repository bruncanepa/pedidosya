const path = require('path');
const readFile = require('./readFile.util');

module.exports = async(path = `../.env`) => {
  const variables = {};
  const file = readFile({name: path, async: false});
  file
    .split('\n')
    .forEach(line => {
      const [key, value] = line.split('=');
      process.env[key] = value;
      variables[key] = value;
    });
  return variables;
};