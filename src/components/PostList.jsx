import React, {Component} from 'react';
import {postRef} from '../firebase';
import {connect} from 'react-redux';
import {setPosts} from '../actions';
import PostItem from './PostItem';

class PostList extends Component{
	componentDidMount(){
		postRef.on('value', snap=>{

			let posts=[];
			snap.forEach(post=>{

				const {email,posttitle}=post.val();
				const serverKey= post.key;
				
				posts.push({email,posttitle, serverKey});
				
			})
			//console.log('posts', posts);	//this is the array posts
			this.props.setPosts(posts);

			
		})

	}
	render(){
		

		return(
			
			<div style={{marginLeft:'5px'}}>{ 
				this.props.posts.map((post,index)=>{
					return(
						<PostItem key={index} post={post} serverKey={post.serverKey}/>
						)
				})
			}
			</div>
			
		);
	}
}

function mapStateToProps(state){
	const{posts} = state;
	return{
		posts
	}
}

export default connect(mapStateToProps,{setPosts})(PostList); //here we have dispatched the action creator directly without using mapDispatch
//also as we have dispatched the action to props, we can display the posts onto our app by accessing the props.