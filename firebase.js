import { getAuth } from 'firebase/auth';
import firebase from '@react-native-firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyCzNSM4eutLKHjHNt0_cbTndPNql0hg3ug",
  authDomain: "maternitycare-61e1e.firebaseapp.com",
  databaseURL: "https://maternitycare-61e1e-default-rtdb.firebaseio.com",
  projectId: "maternitycare-61e1e",
  storageBucket: "maternitycare-61e1e.appspot.com",
  messagingSenderId: "500881920072",
  appId: "1:500881920072:web:68193d1ed9d5581e22887d",
  measurementId: "G-VCQK408WS3"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig )
}

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export const auth = getAuth(app);

 