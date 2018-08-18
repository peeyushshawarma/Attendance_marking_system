import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import AddPost from './AddPost';
import PostList from './PostList';
import {connect} from 'react-redux';

class App extends Component{
	
	signOut(){
		
		firebaseApp.auth().signOut();
	}

	render(){
		return(
			<div style={{marginLeft:'5px'}}>
				<div>
					<h2>Facebook Post</h2>
					<button 
						className='btn btn-danger pull-right'
						style={{marginRight:'10px'}}
						onClick={()=>this.signOut()}
					> 
						Sign Out
					</button>

				</div>
			
			
				<AddPost/>
				<hr/>
				<PostList/>
				<hr/>
				
			</div>

		)
	}

}

function mapStateToProps(state){
	//console.log('state', state);
		return{}
}
export default connect(mapStateToProps,null )(App);