import React from 'react';

import {publishSubscribe} from '../utils';
import {getUserSession} from '../state';

const {events, subscribe} = publishSubscribe;

const container = T => class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {signedIn: !!getUserSession()};
  }

  componentDidMount() {
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
  }

  render() {
    return <T {...this.state} />
  }
};

export default container;