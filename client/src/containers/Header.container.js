import React from 'react';

import {usersAPI} from '../api';
import {publishSubscribe} from '../utils';
import {http} from '../api';

const {events, subscribe} = publishSubscribe;

const container = T => class Header extends React.Component {
  state = {
    user: null
  }

  componentWillMount() {
    this.unsubscribeSignIn = subscribe(events.SIGN_IN, this.onSignIn);
    this.unsubscribeSignOut = subscribe(events.SING_OUT, this.onSignOut);
  }

  componentDidMount() {
    if (!this.state.user && http.getUserSession()) {
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
    return (<T {...this.state}/>)
  }
};

export default container;