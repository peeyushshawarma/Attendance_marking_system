import {combineReducers} from 'redux';
import user from './reducer_user';
import moments from './reducer_moment';
import month from './reducer_month';
import address from './reducer_address';

export default combineReducers({
  user,
  moments,
  month,
  address
})