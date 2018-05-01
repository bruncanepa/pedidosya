import React from 'react';

const container = T => class RestaurantList extends React.Component {
  state = {
    restaurants
  }

  render(){
    return (
      <T {...this.state} />
    )
  }
};

export default container;

const restaurants = [
  {
      "name": "El Encuentro - Montevideo",
      "topCategories": "",
      "rating": 4.5,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//Logo-El Encuentro1.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/el-encuentro-montevideo-menu"
  },
  {
      "name": "D'la Ribera Cordón",
      "topCategories": "",
      "rating": 4.5,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//d-la-ribera-original.jpg",
      "deliveryTimeMaxMinutes": "60",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/dla-ribera-cordon-menu"
  },
  {
      "name": "La Pasiva 18 y Yí",
      "topCategories": "",
      "rating": 4.4,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//la-pasiva-roosevelt.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/la-pasiva-18-y-yi-menu"
  },
  {
      "name": "Guayabos Pizzeria",
      "topCategories": "",
      "rating": 4.4,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//guayabos-by-fans.jpg",
      "deliveryTimeMaxMinutes": "30",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/guayabos-pizzeria-menu"
  },
  {
      "name": "Mónaco Open Bar",
      "topCategories": "",
      "rating": 4.4,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//monaco-logo-18.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/monaco-open-bar-menu"
  },
  {
      "name": "Pancho Villa",
      "topCategories": "",
      "rating": 4.3,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//pancho-villa.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/pancho-villa-menu"
  },
  {
      "name": "Empanadas Mafalda Centro",
      "topCategories": "",
      "rating": 4.2,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//nuevo-logo-mafalda.jpg",
      "deliveryTimeMaxMinutes": "30",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/empanadas-mafalda-centro-menu"
  },
  {
      "name": "Pepito Bar",
      "topCategories": "",
      "rating": 4.2,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//logopepitobar.jpg",
      "deliveryTimeMaxMinutes": "60",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/pepito-bar-menu"
  },
  {
      "name": "Food & Love Cordón",
      "topCategories": "",
      "rating": 4.2,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//logo-food-love-original.jpg",
      "deliveryTimeMaxMinutes": "60",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/food-love-cordon-menu"
  },
  {
      "name": "Bocatta Fast Food",
      "topCategories": "",
      "rating": 4.1,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//bocatta.jpg",
      "deliveryTimeMaxMinutes": "60",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/bocatta-fast-food-menu"
  },
  {
      "name": "Ratatouille,  Hamburguesas de Película",
      "topCategories": "",
      "rating": 4.1,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//ratatouille-logo23.jpg",
      "deliveryTimeMaxMinutes": "60",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/ratatouille-hamburguesas-de-pelicula-menu"
  },
  {
      "name": "Beluá Chivitos Gourmet",
      "topCategories": "",
      "rating": 4.1,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//belua-logo.jpg",
      "deliveryTimeMaxMinutes": "60",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/belua-menu"
  },
  {
      "name": "Tazu Restobar",
      "topCategories": "",
      "rating": 4.1,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//tazu.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/tazu-restobar-menu"
  },
  {
      "name": "La Nona Cordón",
      "topCategories": "",
      "rating": 4.1,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//la-nona-cordon.jpg",
      "deliveryTimeMaxMinutes": "30",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/la-nona-cordon-menu"
  },
  {
      "name": "Siglo XXI",
      "topCategories": "",
      "rating": 4,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//siglo-21-verde.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/siglo-xxi-menu"
  },
  {
      "name": "La Taberna del Diablo",
      "topCategories": "",
      "rating": 3.9,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//la-taberna-del-diablo-logo.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/la-taberna-del-diablo-menu"
  },
  {
      "name": "@Bar",
      "topCategories": "",
      "rating": 3.9,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//arroba-bar.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/bar-menu"
  },
  {
      "name": "Chivilandia",
      "topCategories": "",
      "rating": 3.8,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//chiviland-new.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/chivilandia-menu"
  },
  {
      "name": "La Taberna Del Diablo Restaurant",
      "topCategories": "",
      "rating": 3.7,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//la-taberna-del-diablo-logo.jpg",
      "deliveryTimeMaxMinutes": "45",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/la-taberna-del-diablo-restaurant-menu"
  },
  {
      "name": "The Humam Food",
      "topCategories": "",
      "rating": 3.6,
      "logo": "https://d1v73nxuzaqxgd.cloudfront.net/restaurants//the-humam-food.jpg",
      "deliveryTimeMaxMinutes": "30",
      "link": "http://www.pedidosya.com.uy/restaurantes/montevideo/the-humam-food-menu"
  }
]