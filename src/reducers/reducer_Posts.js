import {SET_POSTS} from '../constants';

export default(state=[], action)=>{
	switch(action.type){
		case SET_POSTS:
			const {posts}=action;
			return posts;
		default:
			return state;


	}
}