import React from 'react';

import {http} from '../api';
import {publishSubscribe, localStorage} from '../utils';

const {events, subscribe} = publishSubscribe;

const container = T => class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {signedIn: !!http.getUserSession()};
  }

  componentWillMount() {
    this.unsubscribeSignIn = subscribe(events.SIGN_IN, this.onSignIn);
    this.unsubscribeSignOut = subscribe(events.SING_OUT, this.onSignOut);
  }

  componentWillUnmount() {
    this.unsubscribeSignIn();
    this.unsubscribeSignOut();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.signedIn != nextState.signedIn;
  }

  onSignIn = () => {
    this.setState({signedIn: true});
  }

  onSignOut = () => {
    this.setState({signedIn: false});
    http.setUserSession();
  }

  render() {
    return (<T {...this.state} />)
  }
};

export default container;