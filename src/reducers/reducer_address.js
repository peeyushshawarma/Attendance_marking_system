import {SET_ADDRESS} from '../constants';

export default(state=null, action)=>{
  switch(action.type){
    case SET_ADDRESS:
      const {address} = action;
      return address;
    default:
      return state;
  }
}