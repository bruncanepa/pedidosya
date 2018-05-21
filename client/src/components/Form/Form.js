import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../containers/Form.container';
import styles from './styles';
import InputForm from '../InputForm';
import ButtonForm from '../ButtonForm';
import Loading from '../Loading';
import dictionary from '../../localization';

class Form extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    inputValues: PropTypes
      .arrayOf(PropTypes.string)
      .isRequired,
    onTextChange: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    validForm: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    successMessage: PropTypes.string
  }

  render() {
    const {form, inputValues, onTextChange, onSend, validForm, errorMessage, successMessage, loading} = this.props;
    const {title, inputs, send} = form;
    return (
      <div style={styles.content}>
        {title.small ? <h3>{title.text}</h3> : <h2>{title.text}</h2>}
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
              onChange={onTextChange(index)}></InputForm>
          ))}
        </div>
        <div style={styles.errorContent}>
          {!validForm && <label style={styles.errorLabel}>{errorMessage || dictionary.form.error} </label>}
          {!!validForm && <label style={styles.successLabel}>{successMessage}</label>}
        </div>
        <ButtonForm onClick={onSend} text={send.text} nextRoute={send.nextRoute} event={send.event}/>
        <Loading overlay show={send.showLoading && loading} />
      </div>
    );
  }
}

export default Container(Form);