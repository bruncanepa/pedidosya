import React from 'react';

import {sessionAPI, administrationAPI} from '../api';
import {routes} from '../constants';

const container = T => class Administration extends React.Component {
  state = {
    signOutNextRoute: routes.signIn,
    onlineUsersCount: '-'
  }

  componentDidMount() {
    this.fetchOnlineUsersCount();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.onlineUsersCount != nextState.onlineUsersCount;
  }

  onSignOut = () => {
    sessionAPI.signOut();
    return {success: true};
  }

  async fetchOnlineUsersCount() {
    const {success, data} = await administrationAPI.getOnlineUsersCount();
    if (success) {
      this.setState({onlineUsersCount: `${data.count}`});
    }
  }

  render() {
    return (
      <T {...this.props} {...this.state} onSignOut={this.onSignOut} />
    )
  }
};

export default container;