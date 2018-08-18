import React, {Component} from 'react';
import {Link} from 'react-router';
import {postRef} from '../firebase';
import {connect} from 'react-redux';
import DeletePostButton from './DeletePostButton';
//import EditPostButton from './EditPostButton';

//this.props.post.email===
class PostItem extends Component{

		// postRef.remove()
		// 	.then(function(){
		// 		console.log('Remove succeeded')
		// 	})
		// 	.catch(function(error) {
		// 		console.log('Remove failed:'+ error.message)
		// 	});
	
	
 

	render(){
      //console.log('postitem props',this.props);
      const usermail = this.props.user.email;  //email of the user logged in right now
		  const{email,posttitle} =this.props.post; //email and posttitle of the post
		  const {serverKey}= this.props;//value of post's serverkey is put into serverKey
		     
      var deleteButton;
      //var editButton;
     if(usermail===email){
        deleteButton=<DeletePostButton/>
        {/*editButton=<EditPostButton serverKey={serverKey} posttitle={posttitle}/>*/}  //serverKey passed as a prop to EditPostButton component
         }

		return(
			<div>
				<div><em>{email}</em></div>
				
					<Link to={`/postdetail/${serverKey}`} >				{/*serverKey is passed to the postdetail component*/}
						<strong>
							{posttitle}
						</strong>
					</Link><span>{deleteButton}{/*{editButton}*/}</span>
					<div>{serverKey}</div>
				

				<hr/>


			</div>
		);
	}
}

 
function mapStateToProps(state){
  const {user}= state;
  //console.log('state in AddGoal.jsx', state);
  return {user}
}

export default connect(mapStateToProps,null)(PostItem);
//postRef.child(serverKey).remove();