import React from 'react';
import PropTypes from 'prop-types';

import {restaurantPropTypes} from '../propTypes';

const container = T => class Restaurant extends React.Component {

  static propTypes = {
    restaurant: PropTypes.shape(restaurantPropTypes)
  };

  render() {
    return (<T {...this.props}/>)
  }
};

export default container;