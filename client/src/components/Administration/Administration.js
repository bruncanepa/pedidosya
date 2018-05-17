import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/Administration.container';
import styles from './styles';
import ButtonForm from '../ButtonForm';
import RestaurantsSearches from '../RestaurantsSearches';
import dictionary from '../../localization';

const Administration = function({onSignOut, signOutNextRoute, onlineUsersCount, searches, loading}) {
  return (
    <div style={styles.content}>
      <div style={styles.dataContent}>
        <h3>{dictionary.administration.onlineUsersCount} </h3>
        <label style={styles.dataLabel}> {onlineUsersCount}</label>
      </div>
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

export default container(Administration);