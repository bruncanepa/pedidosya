import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/RestaurantsSearches.container';
import styles from './styles';
import './styles.css';
import RestaurantSearchItem from '../RestaurantSearchItem';
import Loading from '../Loading';
import dictionary from '../../localization';

const Searches = function({searches, loading}) {
  return (
    <div style={styles.content}>
      <h3 style={styles.title}>{dictionary.administration.restaurantSearches.title}</h3>
      <Loading show={loading}/>
      <table>
        <tr>
          <th>Nro</th>
          <th>Latitud</th>
          <th>Longitud</th>
        </tr>
        {searches.map((search, i) => <RestaurantSearchItem key={search.id} {...search} i={i+1}/>)}
      </table>
    </div>
  )
};

Searches.propTypes = {
  searches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default container(Searches);