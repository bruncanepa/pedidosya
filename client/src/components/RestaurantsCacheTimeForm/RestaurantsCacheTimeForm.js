import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../containers/RestaurantsCacheTimeForm.container';
import Form from '../Form';

const RestaurantsCacheTimeForm = function({form}) {
  return (
    <div>
      <Form form={form}/>
    </div>
  )
};

RestaurantsCacheTimeForm.propTypes = {
  form: PropTypes.object.isRequired
};

export default Container(RestaurantsCacheTimeForm);