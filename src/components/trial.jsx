

const no_of_days=moment(selectMonth).daysInMonth();
          
              let rows=[];
              const clikins= this.props.moments; 
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