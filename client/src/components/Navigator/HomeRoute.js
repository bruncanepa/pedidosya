import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {routes} from '../../constants';
import SignInForm from '../SignInForm';

const HomeRoute = function(signedIn) {
  return (
    <Route render={props => signedIn ? <Redirect to={routes.search}/> : <SignInForm/>}/>
  );
};

export default HomeRoute;