import React from 'react';

import styles from './styles';
import container from '../../containers/Header.container';
import dictionary from '../../localization';
import {userPropTypes} from '../../propTypes';

const logo = 'https://live.pystatic.com/webassets/common/logo-es-407db6fc37dfb4170577326deb283c02.svg';

const Header = function ({user}) {
  const name = user && user.name;
  const lastName = user && user.lastName;
  return (
    <div style={styles.content}>
      <img style={styles.image} src={logo}/> 
      <span style={styles.nameSpan}>{name} {lastName}</span>
    </div>
  );
};

export default container(Header);