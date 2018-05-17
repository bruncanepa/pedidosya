import React from 'react';
import PropTypes from 'prop-types';

import {validator} from '../utils';

const container = T => class Form extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    const {inputs} = props.form;
    this.state = {
      inputValues: inputs
        .map(i => i.defaultValue || ''),
      validForm: true,
      errorMessage: '',
      loading: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return validator.shouldRender({
      props: this.props,
      state: this.state,
      nextState,
      nextProps,
      propsToCheck: ['form'],
      statesToCheck: ['nextState', 'validForm', 'errorMessage', 'loading']
    });
  }

  onTextChange = (id) => {
    return (text) => {
      const inputValues = [...this.state.inputValues];
      inputValues[id] = text;
      this.setState({inputValues, validForm: true});
    }
  }

  onSend = async () => {
    const {inputValues} = this.state;
    const {form, onSend} = this.props;
    const {inputs, send} = form;

    const validForm = inputs.every((input, id) => input.validate(inputValues[id]));
    if (validForm) {
      const data = inputs.reduce((map, input, id) => {
        map[input.name] = inputValues[id];
        return map;
      }, {});
      this.setState({loading: true});
      const response = await send.callback(data);
      this.setState({errorMessage: response.message, validForm: response.success, loading: false});
      return response;
    }
    this.setState({validForm});
    return {success: validForm};
  }

  render() {
    return (
      <T
        {...this.props}
        {...this.state}
        onTextChange={this.onTextChange}
        onSend={this.onSend}/>
    )
  }
};

export default container;