//<div className='col-md-7'>

import React,{Component} from 'react';
import { render } from 'react-dom';
import InfiniteCalendar from 'react-infinite-calendar';
import {Calendar, defaultMultipleDateInterpolation, withMultipleDates} from 'react-infinite-calendar';
import {connect} from 'react-redux';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import {logUser,callmoment} from '../actions';
import {momentRef} from '../firebase';
import moment from 'moment';

 
class Calendars extends Component{

  constructor(props){
    super(props);
    this.state={
      datesArray:[]
    }
  } 
// Render the Calendar
  componentDidMount(){
    momentRef.on('value', snap=>{
       let moments=[];
      snap.forEach(momento=>{
        const {clockInDate, timeIn, timeOut, clockOutDate,email} =momento.val();
        const serverKey=momento.key;

        moments.push({clockInDate, timeIn, serverKey,timeOut,clockOutDate, email});
      })
      
      this.props.callmoment(moments);
  
    })
  }       ///this.props.moments.email===this.props.user.email..........
 


render(){
  console.log('this.props',this.props);
  var today = new Date();

  console.log(today);
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  console.log('lastWeek',lastWeek);

  let thatDays=[];
  const mail= this.props.user.email;

  this.props.moments.map(momento=>{
    const {email}= momento;

    if (mail===email){      // filtering the moments array according to email logged in 
      const {clockInDate} = momento;
      let thatDay=new Date(moment(clockInDate, 'MM DD YYYY'));  //a whole date object is stored in thatDay--->Thu Aug 30 2018 00:00:00 GMT+0530 (India Standard Time)
      
      thatDays.push(thatDay)
            //thatDays array stores the thatDay elements
    }

  })
  //this.setState({datesArray:thatDays})
  console.log('thatDays',thatDays);

  const MultipleDatesCalendar = withMultipleDates(Calendar);

  return(

  <InfiniteCalendar
    width={400}
    height={300}
    Component={withMultipleDates(Calendar)}
    selected={thatDays}
    interpolateSelection={''}
  />
  );
}
}

function mapStateToProps(state){
  const {user,moments} = state;
  
  return{
    user,
    moments
  }
}
export default connect(mapStateToProps,{callmoment})(Calendars);