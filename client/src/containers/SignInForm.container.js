import React from 'react';

import dictionary from '../localization';
import {validator} from '../utils';
import {sessionAPI} from '../api';

const {signInForm} = dictionary;

const form = {
  title: {
    text: signInForm.title
  },
  inputs: [
    {
      name: 'username',
      text: signInForm.username,
      type: 'email',
      validate: (username) => !validator.isNullOrEmpty(username)
    }, {
      name: 'password',
      text: signInForm.password,
      type: 'password',
      validate: (password) => !validator.isNullOrEmpty(password)
    }
  ],
  send: {
    text: signInForm.send,
    callback: (form) => sessionAPI.signIn(form)
  }
};

const container = T => class SignInForm extends React.Component {
  render() {
    return (<T form={form}/>)
  }
};

export default container;