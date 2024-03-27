// import { initializeApp, getApp } from 'firebase/app';
// import { initializeFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// // Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyCJN7VPSONp8lZJh7pzRFT0ePnZ3ULxFu4",
//     authDomain: "health-74752.firebaseapp.com",
//     projectId: "health-74752",
//     storageBucket: "health-74752.appspot.com",
//     messagingSenderId: "570385442841",
//     appId: "1:570385442841:web:d35eb690a27925ab10e288",
//     measurementId: "G-SDBWZC1FZK"
//   };


// // initialize firebase
// // initializeApp(firebaseConfig);

// // export const auth = getAuth();
// // export const database = getFirestore();


// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = initializeFirestore(app, {experimentalForceLongPolling: true});

// export { db, auth };



import { initializeApp, getApp } from '@firebase/app';
import { initializeFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCJN7VPSONp8lZJh7pzRFT0ePnZ3ULxFu4",
    authDomain: "health-74752.firebaseapp.com",
    projectId: "health-74752",
    storageBucket: "health-74752.appspot.com",
    messagingSenderId: "570385442841",
    appId: "1:570385442841:web:d35eb690a27925ab10e288",
    measurementId: "G-SDBWZC1FZK"
  };


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };




// import { initializeApp } from "firebase/app";


// class Fire{
//     constructor(){
//         this.init();
//         this.checkinit();
//     }  

//     init = () => {
//         // if(!firebase.app.length){
            
//         //     firebase.initialapp({
//         //             apiKey: "AIzaSyCJN7VPSONp8lZJh7pzRFT0ePnZ3ULxFu4",
//         //             authDomain: "health-74752.firebaseapp.com",
//         //             projectId: "health-74752",
//         //             storageBucket: "health-74752.appspot.com",
//         //             messagingSenderId: "570385442841",
//         //             appId: "1:570385442841:web:d35eb690a27925ab10e288",
//         //             measurementId: "G-SDBWZC1FZK"
//         //     });

//             const firebaseConfig = {
//                 apiKey: "AIzaSyCJN7VPSONp8lZJh7pzRFT0ePnZ3ULxFu4",
//                 authDomain: "health-74752.firebaseapp.com",
//                 projectId: "health-74752",
//                 storageBucket: "health-74752.appspot.com",
//                 messagingSenderId: "570385442841",
//                 appId: "1:570385442841:web:d35eb690a27925ab10e288",
//                 measurementId: "G-SDBWZC1FZK"
//               };

//             const app = initializeApp(firebaseConfig);
//             // const analytics = getAnalytics(app);

//         // }
//     };


//     checkauth =  () => {
//         firebase.auth().onAuthStateChanged(user => {
//             if(!user){
//                 firebase.auth().signInAnonymously();
//             }
//         }); 
//     };


//     send = messages => {
//         messages.forEach(element => {

//             const message = {
//                 text: element.text,
//                 timestamp: firebase.database.ServerValue.TIMESTAMP,
//                 user: element.user
//             }
            
//             this.db.push(message);
//         });
//     }

//     parse = message => {
//         const {user,text,timestamp} = message.val();
//         const {key: _id} = message;
//         const createdAt = new Date(timestamp);

//         return {
//             _id,
//             createdAt,
//             text,
//             user
//         };
//     };


//     get = callback => {
//          this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
//     }   
     

//     off(){
//         this.db.off();
//     }


//     get db(){
//         return firebase.database().ref("messages");
//     }

//     get uid(){
//       return (firebase.auth().currentuser || {}).uid;
//     }
// }

// export default new Fire();