import React,{Component} from 'react';
import ClockIn from './ClockIn';
import {firebaseApp} from '../firebase';

 
class App extends Component{

  
  
  
  render(){
  
    
    return(
      <div style={{marginLeft:'5px'}}>
        <div className='form-inline'>
          <ClockIn/>  
           
        </div>   
 </div>
    );
  }
}
//{this.state.date}
export default App;