Object.defineProperty(Object.prototype, 'nested', {
  value: function (keys) {
    return keys.reduce((obj, key) => {
      return (obj && obj[key] !== 'undefined')
        ? obj[key]
        : null
    }, this);
  },
  enumerable: false
});

module.exports = {};