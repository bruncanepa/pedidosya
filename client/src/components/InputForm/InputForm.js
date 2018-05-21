import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../containers/InputForm.container';
import styles from './styles';

class InputForm extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  }

  onTextChange = (event) => {
    this
      .props
      .onChange(event.target.value);
  }

  render() {
    const {props} = this;
    return (
      <div style={styles.content}>
        <input
          key={props.id}
          style={styles.input}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          required
          autoFocus={props.autoFocus}
          onChange={this.onTextChange}></input>
      </div>
    )
  }
}

export default Container(InputForm);