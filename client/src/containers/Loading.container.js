import React from 'react';
import PropTypes from 'prop-types';


const container = T => class Loading extends React.PureComponent {
  static propTypes = {
    overlay: PropTypes.bool,
    show: PropTypes.bool
  }

  render() {
    return <T {...this.props}/>
  }
};

export default container;
