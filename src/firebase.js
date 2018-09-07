import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBDA8r6eZoI-6GjHVItXeXWwWjav6fRouA",
    authDomain: "entryclock-b0ecd.firebaseapp.com",
    databaseURL: "https://entryclock-b0ecd.firebaseio.com",
    projectId: "entryclock-b0ecd",
    storageBucket: "entryclock-b0ecd.appspot.com",
    messagingSenderId: "709432197285"
  };
export const firebaseApp=firebase.initializeApp(config);
export const momentRef= firebase.database().ref('moments');