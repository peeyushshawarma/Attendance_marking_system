import React, {Component} from 'react';
// import {postRef} from '../firebase';
// import {connect} from 'react-redux';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';
import AddComments from './AddComments';
import CommentList from './CommentList';
//import ReplyList from './ReplyList';
import EditPosts from './EditPosts';

class PostDetail extends Component{
		constructor(props){
		super(props);
		this.state={
			posts:{},
			

		};
	}
	
	componentDidMount(){
		const serverKey = this.props.params.id;	//that post's serverKey is accessed through params.id and put in serverKey
		firebaseApp.database().ref(`posts/${serverKey}`).once('value', snap=>{	//serverKey is post ID
			this.setState({
				posts:snap.val()		//here the setState sets the state of posts as the value in the snap in the posts

			})

			
		})
	}

	
	render(){
		
		

		const {email,posttitle}=this.state.posts;
		
		const serverKey=this.props.params.id;
		

		//this.props.actioncreator(serverKey);////we can use action creator here and pass it in here
		
		return(
			<div style={{marginLeft:'5px'}}>
				<Link to='/app'>Back To Index</Link>
				<h2>PostTitle</h2>
				<div><em>{email}</em></div>
				<div><strong>{posttitle}</strong></div>
				<div>{serverKey}</div>
				<EditPosts serverKey={serverKey} email={email} posttitle={posttitle}/>
				<AddComments serverKey={serverKey}/>	{/*serverKey passed as props to AddComments component*/}
				<hr/>
				<CommentList PostKey={serverKey} />
				
				
			</div>


		);
	}
}


export default PostDetail;