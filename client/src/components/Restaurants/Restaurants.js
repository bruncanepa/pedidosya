import React from 'react';

import Container from '../../containers/ShouldNotUpdate.container';
import styles from './styles';
import RestaurantItem from '../RestaurantItem';
import Loading from '../Loading';
import {restaurantPropTypes} from '../../propTypes';
import dictionary from '../../localization';
import {formatString} from '../../utils';
import {restaurantsAPI} from '../../api';
import {query as queryUtil} from '../../utils';

const {restaurantsList} = dictionary;

class Restaurants extends React.PureComponent {
  
  coordinates = {latitude: '', longitude: ''}

  state = {restaurants: [], ...this.coordinates, fetched: false, fetching: false}

  async componentDidMount() {
    if (!this.state.fetched) {
      const coordinates = this.getData(this.props);
      this.setState({...coordinates, fetching: true});
      const {data} = await restaurantsAPI.getAll(coordinates);
      this.setState({fetched: true, fetching: false, restaurants: data.restaurants || []});
    }
  }

  getData(props) {
    const {query, search} = props.location;
    let data = this.coordinates;
    if (query) {
      const {longitude, latitude} = query;
      data = {latitude, longitude};
    } else if (search) {
      const {lng, lat} = queryUtil.parse(search);
      data = {latitude: lat, longitude: lng};
    } 
    return data;
  }

  render(){
    const {restaurants, latitude, longitude, fetching} = this.state;
    return (
      <div style={styles.content}>
        <div style={styles.listContent}>
          {restaurants.map(restaurant => (<RestaurantItem key={restaurant.name} restaurant={restaurant}/>))}
          {!fetching && restaurants.length == 0 && <label>{restaurantsList.noItems}</label>}
          <Loading show={fetching}/>
        </div>
      </div>
    );
  }
}

export default Container(Restaurants);