// import firebase from 'firebase/app';
import 'firebase/storage';
import firebase from 'firebase';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC6pDhxF8dt0YW6kckZTroQpZawbiM-zyI",
    authDomain: "porchswing-photos.firebaseapp.com",
    databaseURL: "https://porchswing-photos.firebaseio.com",
    projectId: "porchswing-photos",
    storageBucket: "porchswing-photos.appspot.com",
    messagingSenderId: "950602241765",
    appId: "1:950602241765:web:36d433c7e5fbb40e36260c",
    measurementId: "G-JMML4DM1PN"
  };

  var app = firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default };