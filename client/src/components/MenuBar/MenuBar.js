import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import container from '../../containers/MenuBar.container';
import styles from './styles';

class MenuBar extends React.Component {
  state = {active: 1}

  componentWillMount() {
    const path = window.location.pathname;
    const {options} = this.props;
    const selectedOption = options.find(option => option.route == path) || options[0] ;
    this.setState({active: selectedOption.id});
  }
  
  onClick = (id) => {
    return () => {
      this.setState({active: id});
    }
  }

  render() {
    const {options} = this.props;
    const {active} = this.state;
    return (
      <div style={styles.content}>
        {options.map(({route, text, id}) => (
          <Link   
            style={id == active ? styles.activeLink : styles.link}
            key={id} 
            onClick={this.onClick(id)}
            to={route}>
            {text}
          </Link>
        ))}
      </div>
    );
  }
}

MenuBar.propTypes = {
  options: PropTypes.array.isRequired
};

export default container(MenuBar);