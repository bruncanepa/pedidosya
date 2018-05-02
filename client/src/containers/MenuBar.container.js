import React from 'react';

const container = T => class MenuBar extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render(){
    return (
      <T {...this.props}/>
    )
  }
};

export default container;