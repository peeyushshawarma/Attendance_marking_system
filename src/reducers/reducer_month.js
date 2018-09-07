import {SET_MONTH} from '../constants';
import moment from 'moment';


const element=moment().format('MMM YYYY');

export default(state={element}, action)=>{
  switch(action.type){
    case SET_MONTH:
       const {month}=action;
        return month;
    default:
    return state;
  }
}