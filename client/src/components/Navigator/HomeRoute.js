import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {routes} from '../../constants';
import SignInForm from '../SignInForm';

const HomeRoute = (signedIn) => (
  <Route
    render={props => signedIn
    ? <Redirect to={routes.search}/>
    : <SignInForm/>}/>
);

export default HomeRoute;