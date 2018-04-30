import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import container from '../containers/SignInForm.container';

const SignInForm = function () {
  return (
    <div>
      SignInForm
    </div>
  );
};

export default container(SignInForm);