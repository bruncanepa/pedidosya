import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import container from '../../containers/Root.container';
import styles from './styles';
import SignInForm from '../SignInForm';
import SignedIn from '../SignedIn';
import Header from '../Header';

const Root = function () {
  return (
    <div>
      <Header/>
      <div style={styles.content}>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={SignInForm}/>
            <Route exact={true} path='/restaurants' component={SignedIn}/>
            <Route
              exact={true}
              path='*'
              render={function () {
              return <Redirect to="/"></Redirect>
            }}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default container(Root);