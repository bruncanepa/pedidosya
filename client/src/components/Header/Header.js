import React from 'react';

import styles from './styles';
import container from '../../containers/Header.container';
import dictionary from '../../localization';
import {userPropTypes} from '../../propTypes';

const Header = function ({user}) {
  const name = user && user.name;
  const lastName = user && user.lastName;
  return (
    <div style={styles.content}>
      <span style={styles.titleSpan}>{dictionary.header.title}</span>
      <span style={styles.nameSpan}>{name} {lastName}</span>
    </div>
  );
};

export default container(Header);