const {promisify} = require('util');

module.exports = (callback) => (promisify(callback));