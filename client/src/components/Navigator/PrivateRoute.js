import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {routes} from '../../constants';

const PrivateRoute = (Component, signedIn) => (
  <Route
    render={props => signedIn
    ? <Component {...props}/>
    : <Redirect to={routes.signIn}/>}/>
);

export default PrivateRoute;