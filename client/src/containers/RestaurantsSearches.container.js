import React from 'react';
import PropTypes from 'prop-types';

const container = T => class RestaurantsSearches extends React.PureComponent {
  static propTypes = {
    searches: PropTypes.array.isRequired
  }
  
  state = {loading: true};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searches.length && prevState.loading) {
      return {loading: false};
    }
    return null;
  }

  render(){
    return <T {...this.state} searches={this.props.searches.reverse()} />
  }
};

export default container;