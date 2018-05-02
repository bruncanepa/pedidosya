import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/Administration.container';
import styles from './styles';
import ButtonForm from '../ButtonForm';
import dictionary from '../../localization';

const Administration = function({onSignOut, signOutNextRoute}) {
  return (
    <div style={styles.content}>
      <ButtonForm nextRoute={signOutNextRoute} onClick={onSignOut} text={dictionary.administration.signOut}/>
    </div>
  )
};

Administration.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  signOutNextRoute: PropTypes.string.isRequired
};

export default container(Administration);