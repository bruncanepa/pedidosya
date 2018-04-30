import React from 'react';

const container = T => class RestaurantList extends React.Component {

  render(){
    return (
      <T />
    )
  }
};

export default container;