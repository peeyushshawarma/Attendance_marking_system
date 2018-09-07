import React, {Component} from 'react';
import {momentRef} from '../firebase';
import {callmoment} from '../actions';
import {connect} from 'react-redux';
import moment from 'moment';
//import _ from 'lodash';
import {Link} from 'react-router';

class Entries extends Component{
  
  showrows(){
    var dateToday = moment().format("M/D/YYYY");
    var datesToday = moment(dateToday).format("MMM DD YYYY");
    console.log('dates',dateToday);
    var rows=this.props.moments.map(moment=>{
        
        if(moment.clockInDate===dateToday){
          const {clockInDate, timeIn, timeOut, email, duration, address}=moment;
          console.log('clockInDate, timeIn, timeOut, email, duration, address',clockInDate, timeIn, timeOut, email, duration, address);
          
          return (
            <tr>
              <td>{datesToday}</td>
              <td>{email}</td>
              <td>{timeIn}</td>
              <td>{timeOut}</td>
              <td>{duration}</td>
              <td>{this.status(timeIn)}</td>
              <td>{address}</td>
            </tr>
          )
        
        }
        
        
        })
    return rows;
  }
  
  status(timeIn){
    if (timeIn!==''){
      return 'present'
    }
    else
      return 'absent'

  }

  componentDidMount(){
    momentRef.on('value', snap=>{
      let moments=[];
      snap.forEach(moment=>{
        const {clockInDate, timeIn, timeOut, clockOutDate, email, duration, address}= moment.val();
        moments.push({clockInDate, email,timeIn, timeOut, clockOutDate, duration, address})
      })
      this.props.callmoment(moments);
    })
  }
  render(){
    console.log('this.props',this.props);
    // // let dates= moment().date('MM/DD/YYYY');
    // // let dateToday= moment(dates).format('MM/DD/YYYY');
    // console.log('dateToday',dateToday); //  08/31/2018

    return(
      <div>
        <Link to='/admin'>Back</Link>
        <h2>these are the entries</h2>
        <table className='table table-bordered table hover table-striped'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee ID</th>
            <th>Time-In</th>
            <th>Time-Out</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
        {this.showrows()}

        </tbody>
        
      </table>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {moments}= state;
  return{
    moments
  }
}
export default connect(mapStateToProps,{callmoment})(Entries);