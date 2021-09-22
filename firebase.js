import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLMWr0vTXWRgYRA80e6sbiS3U5WmS5V_I",
  authDomain: "onlibaat-a39fc.firebaseapp.com",
  projectId: "onlibaat-a39fc",
  storageBucket: "onlibaat-a39fc.appspot.com",
  messagingSenderId: "1018915787587",
  appId: "1:1018915787587:web:f31e77cf0ba53ffa5915f6",
  measurementId: "G-KJEQ98WHL6",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
