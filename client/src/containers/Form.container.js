import React from 'react';
import PropTypes from 'prop-types';

const container = T => class Form extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      inputValues: props
        .form
        .inputs
        .map(i => '')
    };
  }

  onTextChange = (id, text) => {
    const inputValues = [...this.state.inputValues];
    inputValues[id] = text;
    this.setState({inputValues});
  }

  onNext = () => {
    const {form} = this.props;
    return this.props.form
  }

  render() {
    return (<T
      {...this.props}
      {...this.state}
      onTextChange={this.onTextChange}
      onNext={this.onNext}/>)
  }
};

export default container;