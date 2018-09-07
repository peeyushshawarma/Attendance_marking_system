import React, {Component} from 'react';
import {momentRef} from '../firebase';
import {callmoment} from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import {selectmonth} from '../actions';
import {bindActionCreators} from 'redux';


//this is to gain access to the database data and display it on screen in form of a list
class MomentList extends Component{

  componentWillReceiveProps(nextprops){
    if (!this.props.moments.length || (nextprops.user.email && !this.props.user.email)) {
    
    momentRef.on('value', snap=>{

      let moments=[];
      snap.forEach(momento=>{
        const {clockInDate, timeIn, timeOut,duration, clockOutDate,email, address} =momento.val();
        const serverKey=momento.key;

        moments.push({clockInDate, timeIn, duration, serverKey,timeOut,clockOutDate, email, address});
      })
      
      this.props.callmoment(moments);
  
    })


  }
    }

  rowLoop(selectMonth){
    console.log('selectMonth',selectMonth);
    
    const currentMonth=moment().format('MMM YYYY');
        if(selectMonth===currentMonth){     //if current month is selected 
          let no_of_days= moment().date();        // no of days in that month
           let rows=[];                            // an empty rows array is set             
           const clikins= this.props.moments;       //collection of moments array 
           const {email}= this.props.user;   //the logged in user's email 
          for(let i=no_of_days;i>=1; i-=1){           // loop to display rows equal to no of days
                const dates=moment().subtract(no_of_days-i,'day');  //logic to display all dates in decreasing order
                const datesAt =moment(dates).format('MMM DD YYYY'); //date we want to display in table rows

                  var row= _.find(clikins, function(obj){     // lodash find to find the matching email from the clikins collection 
                
                    const cdate= moment(obj.clockInDate,'MM DD YYYY').date();     //clockindate is put in cdate 
                    
                    if (obj.email===email){         //if email from an object from collection === logged in user's email
                       return dates.date()===cdate  // return this boolean condition, returned true/false  
                    }
                    })
                
                        if(row){      //if row has some value, i.e true then return that as a table row
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
                        else{                     
                          rows.push(
                                    <tr>
                                      <td>{datesAt}</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>NA</td>
                                      <td>-</td>
                                    </tr>
                            )
                        }  }                                                                                
                         return rows;   
                       
                        }
          else{
             const no_of_days=moment(selectMonth).daysInMonth();
          
              let rows=[];
              const clikins= this.props.moments; 
              const {email}= this.props.user;
              const {address}= this.props;
                     
              const end = moment(selectMonth).endOf('month');
              const End =moment(end).format('MM DD YYYY');
                    
                     
                     
            for(let i=no_of_days; i>=1;i-=1){
                      
              const datesAt= moment(End).subtract(no_of_days-i,'day').format('MMM DD YYYY');  // this one to display in the table
              const dates = moment(datesAt).format('MM DD YYYY'); //this one for matching the date to clockindate in database

              const data= moment(dates, 'MM DD YYYY').date();
              
              

              var row= _.find(clikins, function(obj){

                      const cdate= moment(obj.clockInDate).format('MM DD YYYY');
                      

                      if(obj.email===email){
                        return dates===cdate
                      }
                    })
            
                  if(row){
                    rows.push(
                       <tr>
                        <td>{datesAt}</td>
                        <td>{row.timeIn}</td>
                        <td>{row.timeOut}</td>
                        <td>{row.duration}</td>
                        <td>{this.status(row.timeIn, row.timeOut)}</td>
                        <td>{row.address}</td>
                      </tr>

                      )
                   }
                 else{
                    rows.push(
                      <tr>
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
    else
      return 'absent'
  }

      
      
      
  

  

  render(){
    //let dates= moment().startOf('month');
    //let firstDay = moment(dates).format('Do MMM YYYY')     //1st Aug 2018, first date of month
    console.log('this.props.month.element',this.props.month.element);
    const selectMonth=this.props.month.element;
    //let TodayDate =moment().format('Do MMM YYYY')     //current date

    //let DatesArray=this.dateArray();
    //console.log('DatesArray',DatesArray);
    const {clockInDate,clockOutDate,timeIn,timeOut,duration}=this.props;

    //console.log('this.props array as props',this.props);

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
          {this.rowLoop(selectMonth)}

            
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
