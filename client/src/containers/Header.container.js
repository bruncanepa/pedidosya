import React from 'react';

import {usersAPI} from '../api';
import {publishSubscribe} from '../utils';
import {getUserSession} from '../state';

const {events, subscribe} = publishSubscribe;

const Container = T => class Header extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    this.unsubscribeSignIn = subscribe(events.SIGN_IN, this.onSignIn);
    this.unsubscribeSignOut = subscribe(events.SING_OUT, this.onSignOut);
    
    if (!this.state.user && getUserSession()) {
      this.fetchUserData();
    }
  }

  componentWillUnmount() {
    this.unsubscribeSignIn();
    this.unsubscribeSignOut();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.user != nextState.user;
  }

  onSignIn = () => {
    this.fetchUserData();
  }

  onSignOut = () => {
    this.setState({user: null});
  }

  async fetchUserData() {
    const {user} = await usersAPI.get();
    this.setState({user});
  }

  render() {
    return <T {...this.state} />
  }
};

export default Container;