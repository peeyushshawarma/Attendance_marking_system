clockIn(){
    this.getLocation()
    var date=new Date();    //put condition that if clockInDate is present in database then clockin isn't allowed right now
    //and if the logged in user is also present with that clockin 
    console.log('this.props.user.email', this.props.user.email);
    var dati = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear() ;    //moment()
    var ampm = date.getHours()>=12 ? ' PM' : ' AM';
    var timi = date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds() + ''+ampm;
    var MomentObjects= this.props.moments;
    const {address}= this.props;
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
            //function called to get location
          this.setState({clockInDate:dati, timeIn: timi, clockValue:'clockout'}, function()=>{
            momentRef.push({clockInDate, timeIn, email, address}).then(function(response){
              res = response.key;
              console.log('res',res);
            });
        }
      
  }

clockOut(){
  var date=new Date();

  var dato = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear() ;
  var ampm = date.getHours()>=12 ? ' PM' : ' AM';
  var timo = date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds() + ''+ampm;

  this.setState({clockOutDate:dato, timeOut: timo, clockValue:'clockin'}, function()=>{

    

      var start = moment.utc(timeIn, "HH:mm:ss");
      var end = moment.utc(timeOut, "HH:mm:ss");                             //code for duration work hours

      // account for crossing over to midnight the next day
      if (end.isBefore(start)) end.add(1, 'day');

      // calculate the duration
      var d = moment.duration(end.diff(start));

      // format a string result
      var duration = moment.utc(+d).format('H:mm:ss');
      //const duration= timeOut- timeIn
      var hopperRef= momentRef.child('serverKey') //get this serverkey
      hopperRef.update({clockOutDate, timeOut, duration});    //instead of push, firebase child key update should be used here
  //var hopperRef = usersRef.child("gracehop");
  // hopperRef.update({
  //   "nickname": "Amazing Grace"
  // });
}

// submit(){
//       const {clockInDate,timeIn,clockOutDate,timeOut,Latitude, Longitude} =this.state;
//       const {email} = this.props.user;
//       const {address}= this.props;

      
//         //call to getLocation function above to fetch the location
//     console.log('this.state',this.state);
//      if(!(clockOutDate===''||timeOut==='')){

//       var start = moment.utc(timeIn, "HH:mm:ss");
//       var end = moment.utc(timeOut, "HH:mm:ss");                             //code for duration work hours

//       // account for crossing over to midnight the next day
//       if (end.isBefore(start)) end.add(1, 'day');

//       // calculate the duration
//       var d = moment.duration(end.diff(start));

//       // format a string result
//       var duration = moment.utc(+d).format('H:mm:ss');
//       //const duration= timeOut- timeIn
//       momentRef.push({clockInDate, timeIn, clockOutDate, duration, timeOut, email, address});  //pushing the data to database. push address here too
//       }

//     else{window.alert('Please clock-out first before submit')}
  
// }
