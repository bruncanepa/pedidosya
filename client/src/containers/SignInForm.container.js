import React from 'react';

const container = T => class SignInForm extends React.Component {

  render(){
    return (
      <T />
    )
  }
};

export default container;