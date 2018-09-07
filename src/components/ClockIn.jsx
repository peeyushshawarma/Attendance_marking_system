import React, {Component} from 'react';
import {momentRef} from '../firebase';
import MomentList from './MomentList';
import {connect} from 'react-redux';
import {callmoment} from '../actions';
import {useraddress} from '../actions';
import {firebaseApp} from '../firebase';
import _ from 'lodash';
import Calendars from './Calendars';
import moment from 'moment';
import Geocode from 'react-geocode';


 

//this component is displaying clockin button and pushing the date and time to the database

class ClockIn extends Component{

  componentDidMount(){
    momentRef.on('value', snap=>{

      let moments=[];
      snap.forEach(momento=>{
        const {clockInDate, timeIn, timeOut, clockOutDate} =momento.val();
        const serverKey=momento.key;

        moments.push({clockInDate, timeIn, serverKey,timeOut,clockOutDate});
      })
      // console.log('momentsArray', moments);
      this.props.callmoment(moments);
      //action creator called here
    })


  }

  constructor(props){
    super(props);
    this.state={
      clockInDate: '',
      timeIn: '',
      clockOutDate: '',
      timeOut: '',
      clockValue: 'clockin'
    }
    this.renderButton= this.renderButton.bind(this); 
    this.submit = this.submit.bind(this);
    //this.clockIn= this.clockIn.bind(this);
    //this.clockedInOK = this.clockedInOK.bind(this);
  }

  renderButton(){
    const {clockValue} = this.state;            /*This function is rendering the button on basis of clockvalue state*/
    if(clockValue==='clockin'){
      return(                                       //clockIn and clockOut functions are being called by this method
        <button
          className='btn btn-success'
          type='button'
          onClick={()=>{this.clockIn()}}
        >
        Clock-In
        </button>
        )
    }
    else{
      return(
        <button
          className='btn btn-danger'
          type='button'
          onClick={()=>this.clockOut()}
          >
          Clock-Out
          </button>
        )
    }
  }
  

  clockIn(){
    var date=new Date();    //put condition that if clockInDate is present in database then clockin isn't allowed right now
    //and if the logged in user is also present with that clockin 
    console.log('this.props.user.email', this.props.user.email);
    var dati = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear() ;    //moment()
    var ampm = date.getHours()>=12 ? ' PM' : ' AM';
    var timi = date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds() + ''+ampm;
    var MomentObjects= this.props.moments;
    //._find here
    const {email}=this.props.user;
    console.log('mail',email);
  
      var count=0;
      MomentObjects.map(Object=>{
        if(dati===Object.clockInDate && email===Object.email){
          count+=1;
        }
        })
      //if match is there count have increased else remained the same
      //if condition for count 
        if(count!==0){
          this.setState({clockInDate:'', timeIn:'' ,clockValue:'clockin', clockOutDate:'', timeOut:''}, function(){
           return(
            window.alert('Already Clocked-in today')
          ) 
          })
             
       }
        else{
          this.getLocation()
        //this function should run according to the condition, we will use ._find funcn to search for clockinDate/email
          this.setState({clockInDate:dati, timeIn: timi, clockValue:'clockout'})
        }
      
  }

    

clockOut(){
  var date=new Date();

  var dato = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear() ;
  var ampm = date.getHours()>=12 ? ' PM' : ' AM';
  var timo = date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds() + ''+ampm;

  this.setState({clockOutDate:dato, timeOut: timo, clockValue:'clockin'}, function(){
      console.log('moment', this.state);
      
    });
}

submit(){
      const {clockInDate,timeIn,clockOutDate,timeOut,Latitude, Longitude} =this.state;
      const {email} = this.props.user;
      const {address}= this.props;

      
        //call to getLocation function above to fetch the location
    console.log('this.state',this.state);
     if(!(clockOutDate===''||timeOut==='')){

      var start = moment.utc(timeIn, "HH:mm:ss");
      var end = moment.utc(timeOut, "HH:mm:ss");                             //code for duration work hours

      // account for crossing over to midnight the next day
      if (end.isBefore(start)) end.add(1, 'day');

      // calculate the duration
      var d = moment.duration(end.diff(start));

      // format a string result
      var duration = moment.utc(+d).format('H:mm:ss');
      //const duration= timeOut- timeIn
      momentRef.push({clockInDate, timeIn, clockOutDate, duration, timeOut, email, address});  //pushing the data to database. push address here too
      }

    else{window.alert('Please clock-out first before submit')}
  
}

  
// function for getting USER LOCATION   
getLocation() {       
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {
          
          console.log(`Got location: ${position.coords.latitude}, ${position.coords.longitude}`);
          const latitude= `${position.coords.latitude}`;
          const longitude = `${position.coords.longitude}`;
          console.log(latitude, longitude);   //got the latitude and longitude
          
           
        
          Geocode.fromLatLng(latitude, longitude).then(
            response=>{
              const address = response.results[0].formatted_address;
              console.log(address);
              this.props.useraddress(address);
            },
            error=>{
              console.error(error);
            }
          );
         
          
      })
      
      
    }
    
  }
   

signOut(){
  if(window.confirm('Are you sure you want to Sign-out'))
    firebaseApp.auth().signOut();
  }

  render(){
      const {clockInDate,timeIn,clockOutDate,timeOut} =this.state;
      const {email} = this.props.user;


      console.log('this.props', this.props);

      //console.log(this.props);
         // early state is being rendered
    return(
      <div>
        
        <div className='form-inline'>
          
           <h4>Welcome <em>{email}</em></h4>
               <button type="button" class="btn btn-danger btn-sm" onClick={()=>this.signOut()}>
                      <span className="glyphicon glyphicon-off"></span>  
               </button>
           
        </div>

        <br/>
        <hr/>

       <div>{this.renderButton()}</div>
        <div>Clock-In  : {clockInDate} {timeIn}</div>
        <div>Clock-Out : {clockOutDate} {timeOut}</div> 
        <button 
            className='btn btn-primary btn-sm'
            onClick={()=>this.submit()}
        >
            Submit
        </button>
        <hr/>
        <MomentList clockOutDate={clockOutDate} clockInDate={clockInDate} timeOut={timeOut} timeIn={timeIn}/> <Calendars/>
      </div>
    );  
  }
}


function mapStateToProps(state){
  const {moments,user,address} = state;
  return{
    moments,
    user,
    address
  }
}


export default connect(mapStateToProps,{callmoment, useraddress})(ClockIn);