import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {routes} from '../../constants';

const PrivateRoute = function(Component, signedIn) {
  return (
    <Route render={props => signedIn ? <Component {...props}/> : <Redirect to={routes.signIn}/>}/>
  );
};

export default PrivateRoute;