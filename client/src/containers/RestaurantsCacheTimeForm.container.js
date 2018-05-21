import React from 'react';

import dictionary from '../localization';
import {validator} from '../utils';
import {administrationAPI} from '../api';
import {routes} from '../constants';

const form = {
  title: {
    text: dictionary.administration.restaurantsCacheTime.title,
    small: true
  },
  inputs: [
    {
      name: 'time',
      text: dictionary.administration.restaurantsCacheTime.time,
      type: 'text',
      validate: (time) => !validator.isNullOrEmpty(time)
    }
  ],
  send: {
    text: dictionary.administration.restaurantsCacheTime.send,
    callback: async(form) => await administrationAPI.setRestaurantsCacheTime(form),
    showLoading: true
  }
};

const Container = T => class RestaurantsCacheTimeForm extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render(){
    return <T {...this.props} form={form}/>
  }
};

export default Container;