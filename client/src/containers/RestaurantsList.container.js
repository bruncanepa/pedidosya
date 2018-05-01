import React from 'react';

import {restaurantPropTypes} from '../propTypes';

const container = T => class RestaurantList extends React.Component {
  static propTypes = {
    restaurants: PropTypes.arrayOf(restaurantPropTypes)
  };
  render(){
    return (
      <T />
    )
  }
};

export default container;