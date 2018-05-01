import PropTypes from 'prop-types';

export default {
  name : PropTypes.string.isRequired,
  topCategories : PropTypes.string,
  rating : PropTypes.number.isRequired,
  logo : PropTypes.string.isRequired,
  deliveryTimeMaxMinutes : PropTypes.string.isRequired,
  link : PropTypes.string.isRequired
};