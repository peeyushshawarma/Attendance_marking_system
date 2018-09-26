import React,{Component} from 'react';
import ClockIn from './ClockIn';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';
import Entries from './Entries';

 
class AdminPage extends Component{

  

  
  render(){
  
    
    return(
      <div style={{marginLeft:'5px'}}>
        <div className='form-inline'>
        <Link to='/entries' Component={Entries}>
                <button
                className='btn btn-basic pull-right'
                type='button'
                style={{marginRight:'10px', marginLeft:'10px'}}
                >
                Today's Entries
                </button>
              </Link>
          <div><ClockIn/></div>
          
        </div> 

          
           
          
 </div>
    );
  }
}
//{this.state.date}
export default AdminPage;