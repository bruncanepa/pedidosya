import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/RestaurantsList.container';
import styles from './styles';
import RestaurantItem from '../RestaurantItem';
import {restaurantPropTypes} from '../../propTypes';
import dictionary from '../../localization';
import {formatString} from '../../utils';

const {restaurantsList} = dictionary;

const RestaurantList = function ({restaurants, latitude, longitude}) {
  return (
    <div style={styles.content}>
      <h2>{restaurantsList.title}</h2>
      <label style={styles.infoLabel}>{formatString(restaurantsList.zone, latitude, longitude)}</label>
      <div style={styles.listContent}>
        {restaurants.map(restaurant => (<RestaurantItem key={restaurant.name} restaurant={restaurant}/>))}
        {restaurants.length == 0 && <label>{restaurantsList.noItems}</label>}
      </div>
    </div>
  );
};

RestaurantList.Proptype = {
  restaurants: PropTypes.arrayOf(restaurantPropTypes),
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
};

export default container(RestaurantList);