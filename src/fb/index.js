import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './config';

export default firebase.initializeApp(firebaseConfig);
