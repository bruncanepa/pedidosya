const {PY_PROFILE_API_URL, PY_RESTAURANT_LOGO_API_URL} = require('../config');

function Restaurant({name, topCategories, ratingScore, logo, deliveryTimeMaxMinutes, link}) {
  const self = this;
  self.name = name;
  self.topCategories = topCategories;
  self.rating = ratingScore;
  self.logo = `${PY_RESTAURANT_LOGO_API_URL}/${logo}`;
  self.deliveryTimeMaxMinutes = deliveryTimeMaxMinutes;
  self.link = PY_PROFILE_API_URL.format(link);
}

module.exports = Restaurant;