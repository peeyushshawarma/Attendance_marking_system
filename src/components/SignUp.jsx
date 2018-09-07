import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';

class SignUp extends Component{

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
        <div align='center'>
          <h2>sign up</h2>
          <div className='form-inline'>
            <div className='form-group'>
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
                onChange={event=>this.setState({password:event.target.value})}
              />
              <button 
                className='btn btn-primary' 
                style={{marginLeft:'5px'}}
                onClick={()=>this.signUp()}
              > 
                Sign Up
              </button>
              <div>{this.state.error.message}</div>
            <div>Already have an account?<Link to='/signin'> sign in</Link></div>

            </div>

            
          </div>
        </div>
      );
  }
}

export default SignUp; 