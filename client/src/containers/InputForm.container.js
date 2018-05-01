import React from 'react';

const container = T => class InputForm extends React.Component {
  render(){
    return (
      <T {...this.props}/>
    )
  }
};

export default container;