import React from 'react';
import PropTypes from 'prop-types';

import {restaurantPropTypes} from '../propTypes';
import {restaurantsAPI} from '../api';

const container = T => class Restaurant extends React.Component {
  state = {
    image: ''
  }

  static propTypes = {
    restaurant: PropTypes.shape(restaurantPropTypes)
  };

  componentDidMount() {
    if (!this.state.image) {
      this.fetchimage();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.image != nextState.image;
  }

  async fetchimage() {
    const image = await restaurantsAPI.getImage({logo: this.props.restaurant.logo});
    this.setState({image});
  }

  render() {
    return <T {...this.props} {...this.state}/>
  }
};

export default container;