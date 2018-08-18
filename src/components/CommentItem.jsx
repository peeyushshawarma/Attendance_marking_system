import React, {Component} from 'react';
import AddReply from './AddReply';
import ReplyList from './ReplyList';

class CommentItem extends Component{
  
  render(){
    
    const {email, comment, commentKey}= this.props.comment;

  

    return(
      <div>
        
        <em>{email}</em>
        <div><strong>{comment}</strong></div><span>{commentKey}</span>


        <AddReply commentKey={commentKey}/>
        <ReplyList Commentkey={commentKey}/>  {/*call to ReplyList component*/}
        <hr/>
        <hr/>
      </div>
    );
  }
  
    

}

export default CommentItem;