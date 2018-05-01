import React from 'react';

const container = T => class ButtonForm extends React.Component {
  render(){
    return (
      <T {...this.props} />
    )
  }
};

export default container;