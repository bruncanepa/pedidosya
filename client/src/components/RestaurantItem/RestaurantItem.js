import React from 'react';

import container from '../../containers/RestaurantItem.container';
import styles from './styles';
import {restaurantPropTypes} from '../../propTypes';

const Restaurant = function ({restaurant}) {
  const {name, topCategories, ratingScore, logo, deliveryTimeMaxMinutes, link} = restaurant;
  return (
    <div style={styles.content}>
      <div style={styles.left}> </div>
      <div style={styles.right}> </div>
    </div>
  );
};

Restaurant.Proptype = {
  restaurant: restaurantPropTypes
};

export default container(Restaurant);