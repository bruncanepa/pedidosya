import React from 'react';

const container = T => class SignedIn extends React.Component {

  render(){
    return (
      <T />
    )
  }
};

export default container;