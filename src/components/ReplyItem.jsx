import React, {Component} from 'react';
import AddReply from './AddReply';
import ReplyList from './ReplyList';

class ReplyItem extends Component{
	render(){
		//console.log('reply of thisarticle', this.props.reply);
		const {email,Reply,commentKey,replyKey }= this.props.reply;
		return(
			<div style={{marginLeft:'20px'}}>
				<em>{email}</em>
				<div><strong>{Reply}</strong></div><span>{replyKey}</span>
				
			<AddReply commentKey= {replyKey}/>
					<ReplyList Commentkey={replyKey}/> 
				<hr/>
			
			</div>
		);
	}
}
export default ReplyItem;