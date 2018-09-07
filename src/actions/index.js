import {SET_USER} from '../constants';
import {SET_MOMENT} from '../constants';
import {SET_MONTH} from '../constants';
import {SET_ADDRESS} from '../constants';

export function logUser(email){
  return{
    type: SET_USER,
    email
}
}

export function callmoment(moments){
  return{
    type: SET_MOMENT,
    moments
  }
}

export function selectmonth(month){
  return{
    type: SET_MONTH,
    month
  }
}

export function useraddress(address){
  return{
    type: SET_ADDRESS,
    address
  }
}
