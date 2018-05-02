import React from 'react';

import dictionary from '../localization';
import {validator} from '../utils';
import {sessionAPI} from '../api';
import {routes} from '../constants';

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
      validate: (username) => !validator.isNullOrEmpty(username),
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
    callback: async(form) => await sessionAPI.signIn(form),
    nextRoute: routes.search
  }
};

const container = T => class SignInForm extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<T form={form}/>)
  }
};

export default container;