import React from 'react';

const container = T => class InputForm extends React.Component {
  
  shouldComponentUpdate(nextProps) {
    return this.props.value != nextProps.value;
  }

  render(){
    return (
      <T {...this.props}/>
    )
  }
};

export default container;