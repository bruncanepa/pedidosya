import React from 'react';

import dictionary from '../localization';
import {validator} from '../utils';

const {signInForm} = dictionary;

const form = {
  title: {
    text: signInForm.title
  },
  inputs: [
    {
      text: signInForm.username,
      type: 'email',
      validate: (username) => !validator.isNullOrEmpty(username)
    }, {
      text: signInForm.password,
      type: 'password',
      validate: (password) => !validator.isNullOrEmpty(password)
    }
  ],
  next: {
    text: signInForm.next
  }
};

const container = T => class SignInForm extends React.Component {

  render() {
    return (<T form={form}/>)
  }
};

export default container;