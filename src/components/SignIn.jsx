import React, {Component} from 'react';
import {Link} from 'react-router';
import {firebaseApp} from '../firebase';

class SignIn extends Component{
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
        <div align='center'>
          <h2>sign in</h2>
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
                onClick={()=>this.signIn()}
              > 
                Sign In
              </button>
              <div>{this.state.error.message}</div>
            <div>Don't have an account?<Link to='/signup'> sign up</Link></div>

            </div>

            
          </div>
        </div>
      );
  }
}

export default SignIn; 