import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

import { useState, useEffect } from 'react';
import { getConfig } from './init';
import { FireContext } from '../contexts';
import { isBrowser } from '../utils/pwaUtils';

const FireProvider = ({config, children}) => {
    const [firebase, setFirebase] = useState(null);
    const [fireAuth, setFireAuth] = useState(null);
    const [firestore, setFirestore] = useState(null);
    const [rtdb, setRtdb] = useState(null);
    const [storage, setStorage] = useState(null);
    const [initComplete, setInitComplete] = useState(false);

    useEffect(() => {
        /*
        if (isBrowser()) {
            getConfig()
                .then(firebaseConfig => {
                    setFirebase(firebaseApp.initializeApp(firebaseConfig));
                })
                .catch(err => {
                    console.log('Could not load config', err);
                    process.exit(-1);
                })
        } else {
            console.log('Skipping firebase config on server side ...');
        }
         */
        try {
            if (!firebase && config) {
                setFirebase(firebaseApp.initializeApp(config));
            } else {
                console.log('app already initialized ?');
            }
        } catch (err) {
            console.log('app already initialized ?', err);
        }
    }, [config]);

    useEffect(() => {
        if (firebase) {
            setFireAuth(firebase.auth());
            setFirestore(firebase.firestore());
            setRtdb(firebase.database());
            setStorage(firebase.storage());
        }
    }, [firebase]);

    useEffect(() => {
        if (!initComplete) {
            if (fireAuth) {
                // TODO: get FirebaseAuth import working
                /*
                fb.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then((res) => {
                        console.log('[AUTH]: enabled persistence', res);
                    })
                 */
            }

            if (firestore) {
                firestore.enablePersistence()
                    .then((res) => {
                        console.log('[Store]: enabled persistence', res);
                    })
            }

            setInitComplete(true);
        }
    }, [fireAuth, firestore]);

    return (
        <FireContext.Provider value={{
            auth: fireAuth,
            firestore,
            rtdb,
            storage,
        }}>
            {children}
        </FireContext.Provider>
    );
};

export default FireProvider;
