import firebase from 'firebase';
import { Constants } from 'expo';
import { testConfig, prodConfig } from './firebase-configs';
import { getConfig } from './config-utils';

require('firebase/firestore');
require('firebase/functions');

try {
    const config =
        getConfig(Constants.manifest.releaseChannel) === 'prod'
            ? prodConfig
            : prodConfig;
    firebase.initializeApp(config);
} catch (err) {
    console.error('Firebase initialization error: ', err);
}

export const fire = firebase;
export const rtdb = firebase.database();
export const firebaseAuth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const storage = fire.storage();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});
