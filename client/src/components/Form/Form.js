import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/Form.container';
import styles from './styles';
import InputForm from '../InputForm';
import ButtonForm from '../ButtonForm';

class Form extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    inputValues: PropTypes
      .arrayOf(PropTypes.string)
      .isRequired,
    onTextChange: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired
  }

  onTextChange = (id, text) => {
    this
      .props
      .onTextChange(id, text);
  }

  onChange = (id) => {
    return (text) => {
      this.onTextChange(id, text);
    }
  }

  render() {
    const {form, inputValues, onNext} = this.props;
    const {title, inputs, next} = form;
    return (
      <div style={styles.content}>
        <h2>{title.text}</h2>
        <div style={styles.inputContent}>
          {inputs.map((input, index) => (
            <InputForm
              key={index}
              id={index}
              type={input.type}
              value={inputValues[index]}
              placeholder={input.text}
              required
              autoFocus={index == 0}
              onChange={this.onChange(index)}></InputForm>
          ))}
        </div>
        <ButtonForm onClick={onNext} text={next.text}/>
      </div>
    );
  }
}

export default container(Form);