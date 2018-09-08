
import {SET_USER, SET_ADDRESS, SET_MONTH, SET_MOMENT} from '../constants';


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
