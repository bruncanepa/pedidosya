import React from 'react';

import {sessionAPI, administrationAPI} from '../api';
import {routes} from '../constants';

const container = T => class Administration extends React.Component {
  
  state = {onlineUsersCount: '-'}

  componentDidMount() {
    this.fetchOnlineUsersCount();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.onlineUsersCount != nextState.onlineUsersCount;
  }

  onSignOut() {
    sessionAPI.signOut();
    return {success: true};
  }

  async fetchOnlineUsersCount() {
    const {success, data} = await administrationAPI.getAdminInfo();
    if (success) {
      this.setState({onlineUsersCount: `${data.onlineUsers.count}`});
    }
  }

  signOutNextRoute() { 
    return routes.signIn; 
  }

  render() {
    return (
      <T 
        {...this.props}
        {...this.state} 
        signOutNextRoute={this.signOutNextRoute} 
        onSignOut={this.onSignOut} />
    )
  }
};

export default container;