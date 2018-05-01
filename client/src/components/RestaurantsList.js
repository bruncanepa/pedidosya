import React from 'react';
import PropTypes from 'prop-types';

import container from '../containers/RestaurantList.container';
import RestaurantItem from './RestaurantItem';
import {restaurantPropTypes} from '../propTypes';

const RestaurantList = function ({restaurants}) {
  return (
    <div>
      {restaurants.map(restaurant => (<RestaurantItem restaurant={restaurant}/>))}
      RestaurantList
    </div>
  );
};

RestaurantList.Proptype = {
  restaurants: PropTypes.arrayOf(restaurantPropTypes)
};

export default container(RestaurantList);