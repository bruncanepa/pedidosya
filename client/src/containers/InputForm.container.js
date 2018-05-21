import React from 'react';

const Container = T => class InputForm extends React.Component {
  
  shouldComponentUpdate(nextProps) {
    return this.props.value != nextProps.value;
  }

  render(){
    return <T {...this.props}/>
  }
};

export default Container;