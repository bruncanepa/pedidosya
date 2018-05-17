import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/Loading.container';
import styles from './styles';
import dictionary from '../../localization';

const Loading = function({show, overlay}) {
  return (
    <div>
    {!!show && 
      <div style={overlay ? styles.overlayContent : styles.content}>
        <label style={styles.labelText}>{dictionary.form.loading}</label>
      </div>}
    </div>
  )
};

Loading.propTypes = {
  overlay: PropTypes.bool,
  show: PropTypes.bool
};

export default container(Loading);