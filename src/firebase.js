import firebase from "firebase/compat/app";

var firebaseConfig = {

  apiKey: "AIzaSyA9G6MOkKijlRZg58Zg_1QrKyDm3Mdj614",
  authDomain: "react-curd-c477b.firebaseapp.com",
  projectId: "react-curd-c477b",
  storageBucket: "react-curd-c477b.appspot.com",
  messagingSenderId: "622629280468",
  appId: "1:622629280468:web:257c53d467d46bc432b941"
  
  };
  
const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb;