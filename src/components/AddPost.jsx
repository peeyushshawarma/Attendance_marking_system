import React, {Component} from 'react';
import {postRef} from '../firebase';
import {connect} from 'react-redux';


class AddPost extends Component{
	constructor(props){
		super(props);
		this.state={

			posttitle:''
		}
	}
	
	post(){
		//console.log('this.state', this.state);
		const {posttitle} =this.state;	
		const {email} =this.props.user;	//cuz mapStateToProps have returned the email from the user state as a prop of this component 
		postRef.push({email, posttitle});	//pushes the post to the database		//now to retrieve that data see 'PostList' component

	}


	render(){
		return(
			<div style={{marginLeft:'5px'}}>
				
				<div className='form-inline'>
					<input 
						placeholder='Write a post...' 
						type='text' 
						className='form-control' 
						style={{marginRight:'5px'}}
						onChange={event=>this.setState({posttitle:event.target.value})}
					/>
					<button 
						className='btn btn-primary'
						onClick={()=>this.post()}
					> 
						Post
					</button>
				</div>
				
			</div>
		);
	}
}

function mapStateToProps(state){
	const {user}= state;
	//console.log('state in AddGoal.jsx', state);
	return {user}
}
export default connect(mapStateToProps, null)(AddPost);