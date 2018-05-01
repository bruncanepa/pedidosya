import React from 'react';

import dictionary from '../localization';
import {validator} from '../utils';
import {restaurantsAPI} from '../api';

const {searchRestaurantsForm} = dictionary;

const form = {
  title: {
    text: searchRestaurantsForm.title
  },
  inputs: [
    {
      name: 'latitude',
      text: searchRestaurantsForm.latitude,
      type: 'text',
      validate: (latitude) => !validator.isNullOrEmpty(latitude)
    }, {
      name: 'longitude',
      text: searchRestaurantsForm.longitude,
      type: 'text',
      validate: (longitude) => !validator.isNullOrEmpty(longitude)
    }
  ],
  send: {
    text: searchRestaurantsForm.send,
    callback: (data) => restaurantsAPI.getAll(data)
  }
};

const container = T => class SearchRestaurantsForm extends React.Component {
  render() {
    return (<T form={form}/>)
  }
};

export default container;