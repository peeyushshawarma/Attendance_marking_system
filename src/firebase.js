import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD-eVCCX4V09hbUBWpOkWm3ii8W1JenuQY",
    authDomain: "facebook-1c044.firebaseapp.com",
    databaseURL: "https://facebook-1c044.firebaseio.com",
    projectId: "facebook-1c044",
    storageBucket: "",
    messagingSenderId: "131971437378"
  };
 
export const firebaseApp= firebase.initializeApp(config);
export const postRef = firebase.database().ref('posts');
export const commentRef = firebase.database().ref('comments');
export const replyRef =firebase.database().ref('reply');
