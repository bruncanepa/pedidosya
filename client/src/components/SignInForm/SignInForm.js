import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../containers/SignInForm.container';
import Form from '../Form';

const SignInForm = function ({form}) {
  return (
    <div>
      <Form form={form}/>
    </div>
  );
};

SignInForm.propTypes = {
  form: PropTypes.object.isRequired
};

export default Container(SignInForm);