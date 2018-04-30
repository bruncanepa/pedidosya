import React from 'react';

const container = T => class Restaurant extends React.Component {

  render(){
    return (
      <T />
    )
  }
};

export default container;