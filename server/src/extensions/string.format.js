if (!String.prototype.format) {
  String.prototype.format = function () {
      const args = arguments;
      return this.replace(/{(\d+)}/g, (match, number) => {
          return args[number] !== undefined ? args[number] : '';
      });
  };
}

module.exports = {};