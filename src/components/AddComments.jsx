import React, {Component} from 'react';
import {commentRef} from '../firebase';
import {connect} from 'react-redux';
import {commentPost} from '../actions';


 class AddComments extends Component{
 	constructor(props){
		super(props);
		this.state={
			
			comment:''

		};
	}
	
 	commentPost(){
		
			const {email} =this.props.user;
			const {comment} =this.state;	
			const {serverKey}=this.props;		
			commentRef.push({email,comment, serverKey}); //comments being sent to database

		}
 	render(){
 		//console.log('this.props',this.props);
 		//console.log('this.state',this.state);
 		
 		return(
 		<div>
 			<h3><strong>Comments</strong></h3>
				<hr/>
				<div className='form-inline'>
					<input
						placeholder='Comment'
						type='text'
						className='form-control'
						onChange={event=>this.setState({comment:event.target.value})}
					/>
					<button
						className='btn btn-primary'
						type='button' 
						onClick={()=>this.commentPost()}
					>
						Post
					</button>
				</div>
			</div>
 		);
 	}

 }

 function mapStateToProps(state){
 	const {user} =state;
 	return {user}
 }
 export default connect(mapStateToProps,{commentPost})(AddComments);