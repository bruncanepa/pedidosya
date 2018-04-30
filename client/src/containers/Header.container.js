import React from 'react';

const container = T => class Header extends React.Component {

  render(){
    return (
      <T />
    )
  }
};

export default container;