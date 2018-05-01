import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import container from '../../containers/Root.container';
import styles from './styles';
import SignInForm from '../SignInForm';
import SearchRestaurantsForm from '../SearchRestaurantsForm';
import Header from '../Header';
import RestaurantsList from '../RestaurantsList';

const Root = function () {
  return (
    <div>
      <Header/>
      <div style={styles.content}>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={RestaurantsList}/>
            <Route exact={true} path='/restaurants' component={SearchRestaurantsForm}/>
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