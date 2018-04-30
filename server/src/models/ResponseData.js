function ResponseData({data, message, success, status}) {
  const self = this;
  self.data = data || {};
  self.message = message;
  self.success = !!success;
  self.status = status;
}

module.exports = ResponseData;