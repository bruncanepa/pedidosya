import React from 'react';
import {Link} from 'react-router-dom';

import container from '../../containers/ShouldNotUpdate.container';
import styles from './styles';
import dictionary from '../../localization';
import {routes} from '../../constants';

const MenuBar = function () {
  return (
    <div style={styles.content}>
      <Link style={styles.link} to={routes.search}>{dictionary.menuBar.searchRestaurants}</Link>
      <Link style={styles.link} to={routes.administration}>{dictionary.menuBar.administration}</Link>
    </div>
  );
};

export default container(MenuBar);