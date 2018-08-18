import {combineReducers} from 'redux';
import posts from './reducer_Posts';
import user from './reducer_user';
import comments from './reducer_comments';
import reply from './reducer_reply';

export default combineReducers({
	posts,		//these keys are going to be shown in the state, they consist the values of user and email
	user,
	comments,
	reply

}) 