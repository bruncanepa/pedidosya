import React from 'react';

import {routes} from '../constants';
import dictionary from '../localization';

const container = T => class MenuBar extends React.PureComponent {
  options = [{
    route: routes.search,
    text: dictionary.menuBar.searchRestaurants,
    id: 1
  },{
    route: routes.administration,
    text: dictionary.menuBar.administration,
    id: 2
  }]

  render(){
    return (
      <T 
        {...this.props} 
        options={this.options}
      />
    )
  }
};

export default container;