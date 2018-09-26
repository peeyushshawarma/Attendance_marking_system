import React, {Component} from 'react';
import {momentRef} from '../firebase';
import {callmoment,selectmonth} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import moment from 'moment';




//this is to gain access to the database data and display it on screen in form of a list
class MomentList extends Component{




rowLoop(selectMonth, moments){

    //console.log('selectMonth',selectMonth);
    
    const currentMonth=moment().format('MMM YYYY');
        
        



        if(selectMonth===currentMonth){     //if current month is selected 
          let no_of_days= moment().date();        // no of days in that month
           let rows=[];                            // an empty rows array is set             
           const clikins= moments;
           //console.log('clikins',clikins);       //collection of moments array 
           const {email}= this.props.user;   //the logged in user's email 

        const DateofJoining = _.find(clikins, function(obj){
                if(email===obj.email){
                  return obj.clockInDate
                }
              })
          function returnDOJ(){
            if(DateofJoining)
                {
                  //console.log('DateofJoining', DateofJoining);
                  const DOJ = DateofJoining.clockInDate;
                  return DOJ
                }
          }

          for(let i=no_of_days;i>=1; i-=1){           // loop to display rows equal to no of days
                const dates=moment().subtract(no_of_days-i,'day');  //logic to display all dates in decreasing order
                const datesAt =moment(dates).format('MMM DD YYYY'); //date we want to display in table rows
                const JD = returnDOJ();
                const DOJ = moment(JD).format('MMM DD YYYY');
                //console.log('DOJ', DOJ);
                
                
                //console.log('DOJ', DOJ);

              var row= _.find(clikins, function(obj){     // lodash find to find the matching email from the clikins collection 
                    const datat=dates.date();
                    const cdate= moment(obj.clockInDate,'MM DD YYYY').date();     //clockindate is put in cdate 
                    if (obj.email===email){ 
                           //if email from an object from collection === logged in user's email
                       return datat===cdate  // return this boolean condition, returned true/false  
                    }
                    })
                

                        if(row){ 
                             //if row has some value, i.e true then return that as a table row
                          rows.push(
                                    <tr key={i}>
                                      <td>{datesAt}</td>    
                                      <td>{row.timeIn}</td>
                                      <td>{row.timeOut}</td>
                                      <td>{row.duration}</td>
                                      <td>{this.status(row.timeIn, row.timeOut)}</td>
                                      <td>{row.address}</td>
                                    </tr>
                                    )

                        }
                        //((moment(datesAt,'MMM DD YYYY' ).isBefore(moment()) && moment(datesAt, 'MMM DD YYYY').isAfter(moment(DOJ, 'MMM DD YYYY'))) || (moment(datesAt,'MMM DD YYYY')===moment()) )
                        
                        else if((!row) && moment(datesAt, 'MMM DD YYYY').isBefore(moment()) && moment(datesAt, 'MMM DD YYYY').isAfter(moment(DOJ, 'MMM DD YYYY')) ){
                          rows.push(
                                <tr key={i}>
                                      <td>{datesAt}</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>absent</td>
                                      <td>-</td>
                                    </tr>
                            )
                        }
                        else{                     
                          
                          rows.push(
                                    <tr key={i}>
                                      <td>{datesAt}</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>NA</td>
                                      <td>-</td>
                                    </tr>
                            )
                        }


                          
                      }                                                                                
                         return rows;   
                       
                        }
    
    

    else{
             const no_of_days=moment(selectMonth).daysInMonth();
          
              let rows=[];
              const clikins= moments; 
              const {email}= this.props.user;
              const {address}= this.props;

              const DateofJoining = _.find(clikins, function(obj){
                if(email===obj.email){
                  return obj.clockInDate
                }
              })
          function returnDOJ(){
            if(DateofJoining)
                {
                  //console.log('DateofJoining', DateofJoining);
                  const DOJ = DateofJoining.clockInDate;
                  return DOJ
                }
          }
                    
              const end = moment(selectMonth).endOf('month');
              const End =moment(end).format('MM DD YYYY');
               
                     
            for(let i=no_of_days; i>=1;i-=1){
                
              const datesAt= moment(End).subtract(no_of_days-i,'day').format('MMM DD YYYY');  // this one to display in the table
              const dates = moment(datesAt).format('MM DD YYYY'); //this one for matching the date to clockindate in database

              const data= moment(dates, 'MM DD YYYY').date();
              const JD = returnDOJ();
              const DOJ = moment(JD).format('MMM DD YYYY');
              

              var row= _.find(clikins, function(obj){
                    const cdate= moment(obj.clockInDate).format('MM DD YYYY');
                      if(obj.email===email){
                      return dates===cdate
                      }
                    })
            
                  if(row){
                    rows.push(
                       <tr key={i}>
                        <td>{datesAt}</td>
                        <td>{row.timeIn}</td>
                        <td>{row.timeOut}</td>
                        <td>{row.duration}</td>
                        <td>{this.status(row.timeIn, row.timeOut)}</td>
                        <td>{row.address}</td>
                      </tr>

                      )
                   }
                   else if((!row) && moment(datesAt, 'MMM DD YYYY').isBefore(moment()) && moment(datesAt, 'MMM DD YYYY').isAfter(moment(DOJ, 'MMM DD YYYY'))){
                          rows.push(
                                <tr key={i}>
                                      <td>{datesAt}</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>absent</td>
                                      <td>-</td>
                                    </tr>
                            )
                        }
                        else{                     
                          
                          rows.push(
                                    <tr key={i}>
                                      <td>{datesAt}</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>NA</td>
                                      <td>-</td>
                                    </tr>
                            )
                        }
                
      }
      return rows;
            
        }
      }
              




status(timeIn, timeOut){
    if (timeIn!=='' && timeOut!==''){
      return 'present'
    }
    else if(timeIn!=='' && timeOut==='')
      return 'mispunch'
    
  }

      
      
      
  

  

  render(){
    //console.log('this.props',this.props);

    const selectMonth=this.props.month.element;
    const {moments}= this.props;
    const {clockInDate,clockOutDate,timeIn,timeOut,duration}=this.props;

    //console.log('moments', moments);

             
    
    return(
      <div className='col-md-8'>
      <table className='table table-bordered table hover table-striped'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time-In</th>
            <th>Time-Out</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {this.rowLoop(selectMonth, moments)}

            
        </tbody>
      </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {moments,user,month} = state;
  return{
    moments,
    user,
    month
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({callmoment, selectmonth}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MomentList);
