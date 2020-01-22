import * as firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyBWew8TkyYr1sPNxv5v8AhDgxdEvWEhlBQ",
    authDomain: "whitestar-5a1c3.firebaseapp.com",
    databaseURL: "https://whitestar-5a1c3.firebaseio.com",
    projectId: "whitestar-5a1c3",
    storageBucket: "whitestar-5a1c3.appspot.com",
    messagingSenderId: "477326327000",
    appId: "1:477326327000:web:33644f205218eaea572bad",
    measurementId: "G-RDDQWMB8DJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  export default firebaseApp.firestore()