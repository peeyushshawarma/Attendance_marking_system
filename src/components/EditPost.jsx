// import React, {Component} from 'react';
// import {postRef} from '../firebase';
// import {Link} from 'react-router';
// import {firebaseApp} from '../firebase';

// class EditPost extends Component{
// 	// constructor(props){
// 	// 	super(props);
// 	// 	this.state=>{(
// 	// 		posttitle: this.props.posttitle;
// 	// 		)}
// 	// }



// 	// editPost(){

		
// 	// 	  firebaseApp.database().ref(`posts/${serverKey}` ).set({
// 	// 	    posttitle: {this.state.posttitle}
		    
// 	// 	  });
		
// 	// }

// 	// firebaseApp.database().ref(`posts/${serverKey}`).once('value', snap=>{	//serverKey is post ID
// 	// 		this.setState({
// 	// 			posts:snap.val()		//here the setState sets the state of posts as the value in the snap in the posts

// 	// 		})

// 	render(){
// 		console.log('this.props of EditPost', this.props);
// 		const serverKey= this.props.params.id;

// 		return(
// 			<div>
// 			<Link to='/app'>Back To Index</Link>
// 			<h2>Write your Post</h2>
// 			<input className='form-control'
// 					type="text"
// 					placeholder="Write your post"
// 					//onChange={event=>this.setState({posttitle:event.target.value})}
// 			/>
// 			<button className='btn btn-primary' 
// 					type='button'
// 					//onClick={()=>this.editPost()}
// 			>
// 					Save
// 			</button>
// 			</div>

// 		);
// 	}
// }

// export default EditPost;

