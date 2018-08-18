import React, {Component} from 'react';
import {replyRef} from '../firebase';
import {connect} from 'react-redux';

class AddReply extends Component{
  constructor(props){
    super(props);
    this.state=({
      Reply:''
    })
  }

  writeReply(){
    
    const {email}= this.props.user;
    const {Reply}= this.state;
    const {commentKey}= this.props;
    replyRef.push({email,Reply,commentKey});
  }

  render(){
    return(
      <div className='form-inline' >
          <input 
            className='form-control input-sm' 
            placeholder='reply...' 
            type='text'
            style={{marginRight:'5px'}}
            onChange={event=>this.setState({Reply:event.target.value})}
          /> 
          <button 
            className='btn btn-xs btn-primary' 
            style={{marginLeft:'10px'}}
            onClick={()=>this.writeReply()}
          >
            Reply
          </button>
      </div>
        
    );
  }
}

function mapStateToProps(state){
  const {user}=state;
  return{
    user
  }
}
export default connect(mapStateToProps,null)(AddReply);