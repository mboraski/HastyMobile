import firebase from 'firebase';
import { testConfig, prodConfig } from './firebase-configs';

require('firebase/firestore');
require('firebase/functions');


const getConfig = env => (env === 'prod' ? prodConfig : testConfig);

const config = {
    apiKey: 'AIzaSyBEIuNlAAKU8byP2NUptaZTPtHobhYqMQA',
    authDomain: 'hasty-14d18.firebaseapp.com',
    databaseURL: 'https://hasty-14d18.firebaseio.com',
    projectId: 'hasty-14d18',
    storageBucket: 'hasty-14d18.appspot.com',
    messagingSenderId: '734280961973'
};


// Test
// const config = {
//     apiKey: "AIzaSyCEXU_4PLw71gtg2MujaKzjOLuraMkOqlQ",
//     authDomain: "hasty-test.firebaseapp.com",
//     databaseURL: "https://hasty-test.firebaseio.com",
//     projectId: "hasty-test",
//     storageBucket: "hasty-test.appspot.com",
//     messagingSenderId: "734445972390"
// };

try {
    firebase.initializeApp(getConfig(process.env.ENV));
} catch (err) {
    console.error('Firebase initialization error: ', err);
}

export const fire = firebase;
export const rtdb = firebase.database();
export const firebaseAuth = firebase.auth();
// export const messaging = firebase.messaging();
export const db = firebase.firestore();
export const functions = firebase.functions();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});
