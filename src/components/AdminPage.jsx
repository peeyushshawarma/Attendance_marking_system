import React,{Component} from 'react';
import ClockIn from './ClockIn';
import {firebaseApp} from '../firebase';


 
class AdminPage extends Component{

  

  
  render(){
  
    
    return(
      <div style={{marginLeft:'5px'}}>
        
         

        <div className='form-inline'>

          <div><ClockIn/></div>
          
        </div> 

          
           
          
 </div>
    );
  }
}
//{this.state.date}
export default AdminPage;