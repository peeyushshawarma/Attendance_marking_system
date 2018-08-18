import React, {Component} from 'react';
import {postRef} from '../firebase';

class DeletePostButton extends Component{

	deleteItem(e){

	 	 const{email,posttitle} =this.props.post;
		 const {serverKey}= this.props;
		 postRef.child(serverKey).remove()
		 console.log('post removed');	//to remove the particular post from post list
	}
	render(){

		return(
			
			    <button className='btn btn-xs btn-danger' 
			            style={{marginLeft:'10px'}}
			            onClick={(e) => { if (window.confirm('Are you sure, you want to delete this post?')) this.deleteItem(e) } }
			    >
			        Delete
			    </button>

			
		);	
	}
}

export default DeletePostButton;