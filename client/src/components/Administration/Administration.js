import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../containers/Administration.container';
import styles from './styles';
import ButtonForm from '../ButtonForm';
import RestaurantsCacheTimeForm from '../RestaurantsCacheTimeForm';
import RestaurantsSearches from '../RestaurantsSearches';
import dictionary from '../../localization';

const Separator = function({withPadding}) {
  return (
    <div style={withPadding ? styles.separatorWithPadding : styles.separator}/>
  )
};

const Administration = function({onSignOut, signOutNextRoute, onlineUsersCount, searches, loading}) {
  return (
    <div style={styles.content}>
      <div style={styles.dataContent}>
        <h3>{dictionary.administration.onlineUsersCount} </h3>
        <label style={styles.dataLabel}> {onlineUsersCount}</label>
      </div>
      <Separator/>
      <RestaurantsCacheTimeForm/>
      <Separator withPadding/>
      <RestaurantsSearches searches={searches} loading={loading}/>
      <ButtonForm nextRoute={signOutNextRoute} onClick={onSignOut} text={dictionary.administration.signOut}/>
    </div>
  );
};

Administration.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  signOutNextRoute: PropTypes.func.isRequired,
  onlineUsersCount: PropTypes.string.isRequired,
  searches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Container(Administration);