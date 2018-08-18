import {SIGNED_IN} from '../constants';
import {SET_POSTS} from '../constants';
import {COMMENT_POST} from '../constants';
import {REPLY_REP} from '../constants';


export function logUser(email){
	return {
		type: SIGNED_IN,
		email
	}
}

export function setPosts(posts){
	return{
		type: SET_POSTS,
		posts
	}
}

export function commentPost(comments){
	return{
		type: COMMENT_POST,
		comments
	}
}

export function replyPost(reply){
	return{
		type: REPLY_REP,
		reply
	}
}


