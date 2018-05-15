import React from 'react';

const container = T => class ShouldNotUpdate extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render(){
    return (
      <T {...this.props} />
    )
  }
};

export default container;