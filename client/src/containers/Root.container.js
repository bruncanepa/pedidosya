import React from 'react';

const container = T => class Root extends React.Component {
  render(){
    return (
      <T />
    )
  }
};

export default container;