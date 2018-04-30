import React from 'react';

import container from '../containers/SignedIn.container';
import Header from './Header';

const SignedIn = function () {
  return (
    <div>
      <Header/>
      SignedIn
    </div>
  );
};

export default container(SignedIn);