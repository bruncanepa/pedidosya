import React from 'react';

const container = T => class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    const {data, longitude, latitude} = props.location.state;
    this.state = {
      restaurants: data.restaurants,
      latitude: latitude,
      longitude: longitude
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.restaurants != nextState.restaurants;
  }

  render() {
    return <T {...this.state}/>;
  }
};

export default container;