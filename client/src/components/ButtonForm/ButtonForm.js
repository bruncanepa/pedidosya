import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/ButtonForm.container';
import styles from './styles';

const ButtonForm = function ({onClick, text}) {
  return (
    <div style={styles.content}>
      <button style={styles.button} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

ButtonForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default container(ButtonForm);