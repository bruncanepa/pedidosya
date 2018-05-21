import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../containers/ShouldNotUpdate.container';
import styles from './styles';

const SearchItem = function({latitude, longitude, i}) {
  return (
    <tr>
      <td>{i}</td>
      <td>{latitude}</td>
      <td>{longitude}</td>
    </tr>
  )
};

export default Container(SearchItem);