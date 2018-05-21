const encodeImage = (data) => Buffer.from(data, 'binary').toString('base64');

module.exports = {
  encodeImage
};