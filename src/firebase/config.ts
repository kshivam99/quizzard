import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAuNutV_JW3ldIMPMXntIaCH9Z2iWJ3h9Q",
    authDomain: "quizzard-53d94.firebaseapp.com",
    projectId: "quizzard-53d94",
    storageBucket: "quizzard-53d94.appspot.com",
    messagingSenderId: "996228898588",
    appId: "1:996228898588:web:0558d018eb778a867964d9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const projectFirestore = firebase.firestore();

export { projectFirestore, auth };

export default firebase;
