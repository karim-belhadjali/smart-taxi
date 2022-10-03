import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";

//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCZ_g1IKyfqx-UNjhGKnIbZKPF9rAzVJwg",

  authDomain: "smart-taxi-cbb83.firebaseapp.com",

  projectId: "smart-taxi-cbb83",

  storageBucket: "smart-taxi-cbb83.appspot.com",

  messagingSenderId: "92236093593",

  appId: "1:92236093593:web:05d5ce13b1b575b60ec008",

  measurementId: "G-3JHWJ904TK",
};

let app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, app };
