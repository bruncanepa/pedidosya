import React from 'react';

const Container = T => class ShouldNotUpdate extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render(){
    return <T {...this.props} />
  }
};

export default Container;