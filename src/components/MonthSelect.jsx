import React,{Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import moment from 'moment';
import {selectmonth} from '../actions';
import {connect} from 'react-redux';

class MonthSelect extends Component{
    constructor(props){
        super(props);
        this.state={
            monthSelected: moment().format('MMM YYYY')
        }
    }


    selectAlert(element){
    
        this.setState({monthSelected:element}, function(){

            const month= this.state.monthSelected;
            this.props.selectmonth(month);
        })
    }

  
  render(){
    console.log('this.props', this.props);
   
     var m = moment();
     var months=[];
    for (var i = 0; i < 12; i++) {
     
     var currentMonth=m.month(i).format('MMM YYYY');
     months.push(currentMonth);
     
    }
    
    return(
        <DropdownButton title='Month'
        
        >
            {
                months.map((element,index)=>{

                    return(
                        <MenuItem eventKey={index} onSelect={()=>this.selectAlert({element})}
                        >
                            {element}
                        </MenuItem>  
                        )  
                })
            }
            
        </DropdownButton>
        
      );
  }
}

function mapStateToProps(state){
    const {month} = state;
    return month
}
export default connect(mapStateToProps, {selectmonth})(MonthSelect);


  