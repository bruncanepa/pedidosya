import React from 'react';
import PropTypes from 'prop-types';

const container = T => class RestaurantsSearches extends React.PureComponent {
  static propTypes = {
    searches: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render(){
    return <T {...this.props} searches={this.props.searches.reverse()} />
  }
};

export default container;