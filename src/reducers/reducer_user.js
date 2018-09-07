import {SET_USER} from '../constants';

let user={
  email:null
}

export default(state=user, action)=>{
  switch(action.type){
    case SET_USER:
      const {email}= action;
      user={
        email
      }
      return user;
    default:
      return state;

  }
}
