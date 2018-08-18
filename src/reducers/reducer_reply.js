import {REPLY_REP} from '../constants';

export default(state=[], action)=>{
	switch(action.type){
		case REPLY_REP:
			const {reply}= action;
			return reply;

		default:
			return state;
	}
}