import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

import firebaseConfig from './config-gcp';

export default firebase.initializeApp(firebaseConfig);
