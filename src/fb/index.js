import firebase from '@firebase/app';
import '@firebase/firestore';

import firebaseConfig from './config';

export const loadDB = () => {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.log('Firebase Initalization Error', err);
    }
  }
};
