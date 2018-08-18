import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {browserHistory, Router, Route} from 'react-router';
import {firebaseApp} from './firebase';
import {logUser} from './actions';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {createStore} from 'redux';
import PostDetail from './components/PostDetail';
//import EditPost from './components/EditPost';

const store =createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user=>{
	if(user){
		//console.log('user has signed in or up', user.email);
		const {email}= user;
		store.dispatch(logUser(email));
		//store.dispatch(keyKey(serverKey));
		browserHistory.push('/app');

	}else{
		//console.log('user has signed out or still needs to sign in');
		browserHistory.replace('/signin');
	}
})


ReactDOM.render(
<Provider store={store}>
	<Router path='/' history={browserHistory}>
		<Route path='/app' component={App}/>
		<Route path='/signin' component={SignIn}/>
		<Route path='/signup' component={SignUp}/>
		<Route path='/postdetail/:id' component={PostDetail}/>
		
	</Router>
	
</Provider>, document.getElementById('root')
);
//<Route path='/editpost/:id' component={EditPost}/>
