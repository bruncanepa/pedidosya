import React from 'react';
import PropTypes from 'prop-types';

const container = T => class Form extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputValues: props
        .form
        .inputs
        .map(i => ''),
      validForm: true
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {inputValues, validForm} = this.state;
    const {form} = this.props;
    return inputValues != nextState.inputValues || validForm != nextState.validForm || form != nextProps.form;
  }

  onTextChange = (id) => {
    return (text) => {
      const inputValues = [...this.state.inputValues];
      inputValues[id] = text;
      this.setState({inputValues});
    }
  }

  onSend = async () => {
    const {inputValues} = this.state;
    const {inputs, send} = this.props.form;
    const validForm = inputs.every((input, id) => input.validate(inputValues[id]));
    if (validForm) {
      const data = inputs.reduce((map, input, id) => {
        map[input.name] = inputValues[id];
        return map;
      }, {});
      await send.callback(data);
    } else {
      this.setState({validForm: false});
    }
    return validForm;
  }

  render() {
    return (<T
      {...this.props}
      {...this.state}
      onTextChange={this.onTextChange}
      onSend={this.onSend}/>)
  }
};

export default container;