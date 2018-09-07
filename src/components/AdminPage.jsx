import React,{Component} from 'react';
import ClockIn from './ClockIn';
import MonthSelect from './MonthSelect';
import Entries from './Entries';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';

 
class AdminPage extends Component{

  

  
  render(){
  
    
    return(
      <div style={{marginLeft:'5px'}}>
        
        <div>
            
            
            <div>
              <Link to='/entries' Component={Entries}>
                <button
                className='btn btn-basic pull-right'
                type='button'
                style={{marginRight:'10px', marginLeft:'10px'}}
                >
                Today's Entries
                </button>
              </Link>
            </div>

            <div align='right' style={{marginRight:'10px'}}>
              <MonthSelect/>
            </div>
            
        
        </div> 

        <div className='form-inline'>

          <div><ClockIn/></div>
          
        </div> 

          
           
          
 </div>
    );
  }
}
//{this.state.date}
export default AdminPage;