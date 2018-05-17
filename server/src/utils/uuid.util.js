const uuid = require('uuid/v4');

module.exports = (prefix = '') => {
  const id = uuid().split('-').join(''); // replace('-', '') does not work
  return `${prefix}-${id}`;
};