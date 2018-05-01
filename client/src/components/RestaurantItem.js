import React from 'react';

import container from '../containers/Restaurant.container';
import {restaurantPropTypes} from '../propTypes';

const Restaurant = function ({restaurant}) {
  const {name} = restaurant;
  return (
    <div>
      Restaurant {name}
    </div>
  );
};

Restaurant.Proptype = {
  restaurant: restaurantPropTypes
};

export default container(Restaurant);