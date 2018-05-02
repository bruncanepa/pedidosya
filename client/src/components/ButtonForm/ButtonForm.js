import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import container from '../../containers/ButtonForm.container';
import styles from './styles';


class ButtonForm extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    nextRoute: PropTypes.string,
    event: PropTypes.string
  }

  onClick = (history) => {
    return async() => {
      const {onClick, nextRoute} = this.props
      const result = await onClick();
      if (nextRoute && result.success) {
        history.push({
          pathname: nextRoute,
          state: result
        });
      } 
    }
  }

  render() {
    const {onClick, text} = this.props;
    return (
      <Route render={({history}) => (
        <div style={styles.content}>
          <button style={styles.button} onClick={this.onClick(history)}>
            {text}
          </button>
        </div>
      )}/>
    )
  }
};  

export default container(ButtonForm);