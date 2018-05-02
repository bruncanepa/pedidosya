import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/RestaurantsList.container';
import styles from './styles';
import RestaurantItem from '../RestaurantItem';
import {restaurantPropTypes} from '../../propTypes';
import dictionary from '../../localization';

const {restaurantsList} = dictionary;

const RestaurantList = function ({restaurants}) {
  return (
    <div style={styles.content}>
      <h2>{restaurantsList.title}</h2>
      <div style={styles.listContent}>
        {restaurants.map(restaurant => (<RestaurantItem key={restaurant.name} restaurant={restaurant}/>))}
      </div>
    </div>
  );
};

RestaurantList.Proptype = {
  restaurants: PropTypes.arrayOf(restaurantPropTypes)
};

export default container(RestaurantList);