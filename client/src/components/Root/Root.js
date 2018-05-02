import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import container from '../../containers/Root.container';
import styles from './styles';
import SignInForm from '../SignInForm';
import SearchRestaurantsForm from '../SearchRestaurantsForm';
import Header from '../Header';
import MenuBar from '../MenuBar';
import RestaurantsList from '../RestaurantsList';
import PrivateRoute from './PrivateRoute';
import {http} from '../../api';
import {routes} from '../../constants';

const Root = function ({signedIn}) {
  return (
    <div>
      <Header/>
      <div style={styles.content}>
        <Router>
          <div>
            {signedIn && <Route component={MenuBar}/>}
            <Switch>
              <Route exact={true} path={routes.signIn} render={() => signedIn ? <Redirect to={routes.search }/> : <SignInForm />}/>
              <Route
                exact={true}
                path={routes.search}
                render={() => PrivateRoute(SearchRestaurantsForm, signedIn)}/>
              <Route
                exact={true}
                path={routes.restaurants}
                render={() => PrivateRoute(RestaurantsList, signedIn)}/>
              <Route
                exact={true}
                path={routes.administration}
                render={() => PrivateRoute(RestaurantsList, signedIn)}/>
              <Route
                exact={true}
                path='*'
                render={() => <Redirect to={signedIn ? routes.search : routes.signIn}/>}/>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default container(Root);