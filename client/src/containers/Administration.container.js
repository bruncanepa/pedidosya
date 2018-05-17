import React from 'react';

import {sessionAPI, administrationAPI} from '../api';
import {routes} from '../constants';

const container = T => class Administration extends React.PureComponent {
  
  state = {onlineUsersCount: '-', searches: [], loading: true}

  componentDidMount() {
    this.fetchData();
  }

  onSignOut() {
    sessionAPI.signOut();
    return {success: true};
  }

  async fetchData() {
    const {success, data} = await administrationAPI.getAdminInfo();
    if (success) {
      const {onlineUsers, searches} = data;
      this.setState({onlineUsersCount: `${onlineUsers.count}`, searches: searches.last, loading: false});
    } else {
      this.setState({loading: false});
    }
  }

  signOutNextRoute() { 
    return routes.signIn; 
  }

  render() {
    return (
      <T 
        {...this.state} 
        signOutNextRoute={this.signOutNextRoute} 
        onSignOut={this.onSignOut} 
      />
    )
  }
};

export default container;