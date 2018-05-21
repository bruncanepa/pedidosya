import React from 'react';
import PropTypes from 'prop-types';

import {restaurantPropTypes} from '../propTypes';
import {restaurantsAPI} from '../api';

const Container = T => class RestaurantItem extends React.PureComponent {
  state = {image: '', fetching: true}

  static propTypes = {
    restaurant: PropTypes.shape(restaurantPropTypes)
  };

  componentDidMount() {
    this.fetchImage();
  }

  async fetchImage() {
    const image = await restaurantsAPI.getImage({logo: this.props.restaurant.logo});
    this.setState({image, fetching: false});
  }

  render() {
    return <T {...this.props} {...this.state}/>
  }
};

export default Container;