import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import container from '../containers/Root.container';
import SignInForm from './SignInForm';
import SignedIn from './SignedIn';

const Root = function () {
  return (
    <Router>
      <Switch>
        <Route exact={true} path='/' component={SignInForm}/>
        <Route exact={true} path='/restaurants' component={SignedIn}/>
        <Route
          exact={true}
          path='*'
          render={() => (
          <Redirect to="/"></Redirect>
        )}/>
      </Switch>
    </Router>
  );
};

export default container(Root);