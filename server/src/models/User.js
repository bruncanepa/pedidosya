const UserCountry = require('./UserCountry');

function User({id, name, lastName, country }) {
  const self = this;
  self.id = id;
  self.name = name,
  self.lastName = lastName;
  self.country = new UserCountry(country);
}

module.exports = User;