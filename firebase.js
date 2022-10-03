// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCZ_g1IKyfqx-UNjhGKnIbZKPF9rAzVJwg",

  authDomain: "smart-taxi-cbb83.firebaseapp.com",

  projectId: "smart-taxi-cbb83",

  storageBucket: "smart-taxi-cbb83.appspot.com",

  messagingSenderId: "92236093593",

  appId: "1:92236093593:web:05d5ce13b1b575b60ec008",

  measurementId: "G-3JHWJ904TK",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
