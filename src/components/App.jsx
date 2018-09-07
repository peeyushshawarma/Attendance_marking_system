import React,{Component} from 'react';
import ClockIn from './ClockIn';
import MonthSelect from './MonthSelect';


import {firebaseApp} from '../firebase';

 
class App extends Component{

  
  
  
  render(){
  
    
    return(
      <div style={{marginLeft:'5px'}}>
        <div> 
        
        <div align='right' style={{marginRight:'40px'}}>
            <MonthSelect/>
          </div>
        
        </div> 

        <div className='form-inline'>
          <ClockIn/>  
           
        </div>   
 </div>
    );
  }
}
//{this.state.date}
export default App;