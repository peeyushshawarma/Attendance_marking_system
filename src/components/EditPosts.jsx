import React,{Component} from 'react';
import {firebaseApp} from '../firebase';
import {postRef} from '../firebase';

class EditPosts extends Component{
	constructor(props){
		super(props);
		this.state={
			currentpost:''

			}
	}

	PostUpdate(serverKey){
		postRef.child(`${serverKey}`).set({
	    posttitle: this.state.currentpost,
	    email:this.props.email
	   });
	}
	render(){
		const {posttitle} = this.props;
		const {serverKey} =this.props;
		const {email} =this.props;
		//console.log('this.state EditPosts', this.state);
		//console.log('this.props EditPosts', this.props);
		return(
			<div>
				<hr/>
					<h2>Edit</h2>
					<input
						className= 'form-control'
						placeholder= 'update post'
						type='text'
						onChange={event=>this.setState({currentpost:event.target.value})}
					/>
					<button 
						className='btn btn-primary' 
						type='button'
						onClick={()=>this.PostUpdate(serverKey)}
					>
						Update
					</button>
				<hr/>
			</div>
		);
	}
}

export default EditPosts;