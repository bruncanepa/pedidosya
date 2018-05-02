import React from 'react';

import {http} from '../api';
import {publishSubscribe, localStorage} from '../utils';

const {events, subscribe} = publishSubscribe;


const container = T => class Root extends React.Component {
  componentWillMount() {
    this.unsubscribeSignOut = subscribe(events.SING_OUT, this.onSignOut);
  }

  componentWillUnmount() {
    this.unsubscribeSignOut();
  }

  onSignOut = () => {
    http.setUserSession();
  } 

  render(){
    return (
      <T />
    )
  }
};

export default container;