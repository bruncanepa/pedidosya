import React from 'react';

import {sessionAPI} from '../api';
import {routes} from '../constants';

const container = T => class Administration extends React.Component {
  state = {
    signOutNextRoute: routes.signIn
  }

  shouldComponentUpdate() {
    return false;
  }

  onSignOut = () => {
    sessionAPI.signOut();
  }

  render() {
    return (
      <T {...this.props} {...this.state} onSignOut={this.onSignOut} />
    )
  }
};

export default container;