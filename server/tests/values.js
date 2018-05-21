const access_token = 'access_token';
const username = 'username';
const password = 'password';
const user = {
  id: 'user_id',
  name: 'Name',
  lastName: 'LastName',
  country: {
    id: '1'
  }
};

const restaurants = [{
  "logo": "arroba-bar.jpg",
  "ratingScore": "3.70",
  "deliveryTimeMaxMinutes": "45",
  "link": "bar",
  "name": "@Bar",
  "opened": 1,
  "topCategories": ""
}, {
  "logo": "lo-de-caro-express.jpg",
  "ratingScore": "3.10",
  "deliveryTimeMaxMinutes": "30",
  "link": "lo-de-caro-express",
  "name": "Lo de Caro Express",
  "opened": 1,
  "topCategories": ""
}, {
  "logo": "pizzeria-rivera.jpg",
  "ratingScore": "3.80",
  "deliveryTimeMaxMinutes": "30",
  "link": "pizzeria-rivera",
  "name": "Pizzería Rivera",
  "opened": 1,
  "topCategories": ""
}, {
  "logo": "mc-woking.jpg",
  "ratingScore": "4.10",
  "deliveryTimeMaxMinutes": "45",
  "link": "mc-woking",
  "name": "MC Woking",
  "opened": 1,
  "topCategories": ""
}, {
  "logo": "d-la-ribera-original.jpg",
  "ratingScore": "4.70",
  "deliveryTimeMaxMinutes": "60",
  "link": "dla-ribera-cordon",
  "name": "D'la Ribera Cordón",
  "opened": 2,
  "topCategories": ""
}];


module.exports = {
  access_token,
  username,
  password,
  user,
  restaurants
};