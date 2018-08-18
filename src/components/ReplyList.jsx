import React, {Component} from 'react';
import {replyRef} from '../firebase';
import {connect} from 'react-redux';
import {replyPost} from '../actions';
import ReplyItem from './ReplyItem';
import _ from 'lodash';

class ReplyList extends Component{
	componentDidMount(){
		
		replyRef.on('value', snap=>{

			let replyArray=[];
			snap.forEach(eachReply=>{
				const {commentKey}= eachReply.val();
				const {Commentkey} = this.props;
				// if(commentKey===Commentkey){
				const {email, Reply}= eachReply.val();
				
				const replyKey =eachReply.key;
				replyArray.push({email,Reply, replyKey, commentKey});
				// }
				
			})
						this.props.replyPost(replyArray);

		})
	}
	render(){
		//console.log('replyArray',replyArray);
		//console.log('reply aane ke baad',this.props);
		//this.props.Commentkey===this.props.reply.commentKey
		const {Commentkey} =this.props;
		const {commentKey} =this.props.reply;
		let replies=_.filter(this.props.reply, {commentKey: Commentkey});
			
		//console.log('replies', replies);
		return(

			<div>
				{
					 
					replies.map((eachreply)=>{
						return( 
							<ReplyItem key={eachreply.replyKey} reply={eachreply} />
							)
					})
				}
			</div>
		)
	}
}

function mapStateToProps(state){
	const {reply}=state;
	return{
		reply
	}
}
export default connect(mapStateToProps,{replyPost})(ReplyList);