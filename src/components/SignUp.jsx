import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';

class signup extends Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			error:{
				message:''
			}

		}
	}

	signUp(){
	
		const {email,password} =this.state;
		firebaseApp.auth().createUserWithEmailAndPassword(email, password)
		.catch(error=>{
			this.setState({error})
		})
	}
	render(){
		return(
			<div className='form-inline' >
				<h2>Sign Up</h2>
				<input
					placeholder='email'
					className='form-control'
					type='text'
					style={{marginRight:'5px'}}
					onChange={event=>this.setState({email:event.target.value})}
				/>
				<input
					placeholder='password'
					className='form-control'
					type='password'
					style={{marginRight:'5px'}}
					onChange={event=>this.setState({password:event.target.value})}
				/>
				<button 
					className='btn btn-primary'
					onClick={()=>this.signUp()}
				> 
					Sign Up 
				</button>
				<div>{this.state.error.message}</div>
				<div><Link to='/signin'> Already have an account? Sign In</Link></div>
			</div>
		);
	}
}
export default signup;