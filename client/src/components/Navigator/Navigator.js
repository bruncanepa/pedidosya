import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import SearchRestaurantsForm from '../SearchRestaurantsForm';
import MenuBar from '../MenuBar';
import RestaurantsList from '../RestaurantsList';
import Administration from '../Administration';
import PrivateRoute from './PrivateRoute';
import HomeRoute from './HomeRoute';
import {routes} from '../../constants';

const Navigator = function ({signedIn}) {
  return (
    <Router>
      <div>
        {signedIn && <Route component={MenuBar}/>}
        <Switch>
          <Route
            exact
            path={routes.signIn}
            render={() => HomeRoute(signedIn)}/>
          <Route
            exact
            path={routes.search}
            render={({history}) => history.location.search ? PrivateRoute(RestaurantsList, signedIn) : PrivateRoute(SearchRestaurantsForm, signedIn)}/>
          <Route
            path={routes.restaurants}
            render={() => PrivateRoute(RestaurantsList, signedIn)}/>
          <Route
            exact
            path={routes.administration}
            render={() => PrivateRoute(Administration, signedIn)}/>
          <Route
            exact
            path='*'
            render={()=> <Redirect to={signedIn ? routes.search : routes.signIn}/>}/>          
        </Switch>
      </div>
    </Router>
  )
};



export default Navigator;