import {COMMENT_POST} from '../constants';

export default(state=[], action)=>{
	switch(action.type){
		case COMMENT_POST:
			const {comments} = action;
			return comments;
		default :
			return state;
	}

}