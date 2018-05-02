import React from 'react';

import container from '../../containers/RestaurantItem.container';
import styles from './styles';
import {restaurantPropTypes} from '../../propTypes';
import dictionary from '../../localization';

const {restaurantItem} = dictionary;

const Restaurant = function ({restaurant, image}) {
  const {name, topCategories, rating, logo, deliveryTimeMaxMinutes, link} = restaurant;
  return (
    <div style={styles.content}>
      <div style={styles.left}>
        {!!image && <img src={`${image}`} />}
      </div>
      <div style={styles.right}>
        <label style={styles.titleLabel}>{name}</label>
        <label style={styles.label}>{restaurantItem.rating}{rating}</label>
        {!!topCategories && <label style={styles.label}>{restaurantItem.topCategories}{topCategories}</label>}
        <label style={styles.label}>{restaurantItem.deliveryTimeMaxMinutes}{deliveryTimeMaxMinutes}{restaurantItem.minutes}</label>
        <a href={link}>{restaurantItem.profile}</a>
      </div>
    </div>
  );
};

Restaurant.Proptype = {
  restaurant: restaurantPropTypes
};

export default container(Restaurant);