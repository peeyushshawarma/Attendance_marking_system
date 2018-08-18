import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';

class signin extends Component{
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

	signIn(){
	
		const {email,password} =this.state;
		firebaseApp.auth().signInWithEmailAndPassword(email, password)
		.catch(error=>{
			this.setState({error})
		})
	}
	render(){
		return(
			<div className='form-inline' >
				<h2>Sign In</h2>
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
					onClick={()=>this.signIn()}
				> 
					Sign In 
				</button>
				<div>{this.state.error.message}</div>
				<div><Link to='/signup'> Don't have an account? Sign Up</Link></div>
			</div>
		);
	}
}
export default signin;