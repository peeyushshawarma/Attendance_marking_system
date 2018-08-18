import React, {Component} from 'react';
import {commentRef} from '../firebase';
import {connect} from 'react-redux';
import {commentPost} from '../actions';
import CommentItem from './CommentItem';


class CommentList extends Component{
	componentDidMount(){
		commentRef.on('value', snap=>{

			let Comments=[];
			snap.forEach(eachcomment=>{
				// let postObject = post.val();
				// console.log('postObject', postObject);
				
				const {serverKey}=eachcomment.val();
				
				if(serverKey===this.props.PostKey){
				const {email,comment}=eachcomment.val();
				
				const commentKey= eachcomment.key;
				//console.log({email, posttitle});	
				Comments.push({email,comment, commentKey, serverKey});	//email is the commentable id
				}
			})
				//this is the array comments
			this.props.commentPost(Comments);

			
		})

	}
	render(){
		
		return(
			
			
	
		<div style={{marginLeft:'5px'}}>
			{ 
				this.props.comments.map((comment)=>{
					return(
						<CommentItem key={comment.commentKey} comment={comment} />
						)
				})
			}
		</div>
);
	
}
}

function mapStateToProps(state){
	const{comments} = state;
	return{
		comments
	}
}

export default connect(mapStateToProps,{commentPost})(CommentList); //here we have dispatched the action creator directly without using mapDispatch

