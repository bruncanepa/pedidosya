import React from 'react';
import PropTypes from 'prop-types';

import container from '../containers/RestaurantList.container';
import RestaurantItem from './RestaurantItem';

const RestaurantList = function ({restaurants}) {
  return (
    <div>
      {restaurants.}
      RestaurantList
    </div>
  );
};

export default container(RestaurantList);