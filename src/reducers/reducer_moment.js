import {SET_MOMENT} from '../constants';


export default (state=[], action)=>{
  switch(action.type){
    case SET_MOMENT:
      const {moments}=action;
      return moments;
    default:
      return state;
  }
}