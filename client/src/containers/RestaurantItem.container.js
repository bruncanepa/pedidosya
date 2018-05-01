import React from 'react';

import {restaurantPropTypes} from '../propTypes';

const container = T => class Restaurant extends React.Component {

  static propTypes = {
    restaurant: restaurantPropTypes
  };

  render() {
    return (<T/>)
  }
};

export default container;