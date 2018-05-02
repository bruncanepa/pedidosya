import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import container from '../../containers/Root.container';
import styles from './styles';
import SignInForm from '../SignInForm';
import SearchRestaurantsForm from '../SearchRestaurantsForm';
import Header from '../Header';
import MenuBar from '../MenuBar';
import RestaurantsList from '../RestaurantsList';
import {http} from '../../api';
import {routes} from '../../constants';

const PrivateRoute = (Component, signedIn) => (
  <Route
    render={props => signedIn
    ? <Component {...props}/>
    : <Redirect to={routes.signIn}/>}/>
);

const Root = function ({signedIn}) {
  return (
    <div>
      <Header/>
      <div style={styles.content}>
        <Router>
          <div>
            {signedIn && <Route component={MenuBar}/>}
            <Switch>
              <Route exact={true} path={routes.signIn} component={SignInForm}/>
              <Route
                exact={true}
                path={routes.search}
                render={() => PrivateRoute(SearchRestaurantsForm, signedIn)}/>
              <Route
                exact={true}
                path={routes.restaurants}
                render={() => PrivateRoute(RestaurantsList, signedIn)}/>
              <Route exact={true} path='*' render={() => <Redirect to={routes.signIn}/>}/>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default container(Root);