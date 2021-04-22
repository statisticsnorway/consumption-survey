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
    const [reinitFlag, setReinitFlag] = useState(false);

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
    }, [firebase, config]);

    const clearFirebaseComponents = () => {
        setFirestore(null);
        setStorage(null);
        setRtdb(null);
        setFireAuth(null);
        console.log('firebase components cleared');
    };

    const initFirebaseComponents = () => {
        setFireAuth(firebase.auth());
        setFirestore(firebase.firestore());
        setRtdb(firebase.database());
        setStorage(firebase.storage());
        console.log('firebase components initialized', fireAuth, firestore, rtdb, storage);
    };

    const resetFirebaseComponents = () => {
        clearFirebaseComponents();
        initFirebaseComponents();
    };

    useEffect(() => {
        if (firebase) {
            initFirebaseComponents();
        }
    }, [firebase]);

    const reset = async () => {
        if (firebase) {
            if (firestore) {
                try {
                    await firestore.terminate();
                    console.log('successfully terminated firestore')

                    await firestore.clearPersistence();
                    console.log('successfully cleared firestore persistence');
                } catch (err) {
                    console.log('could not terminate/clear firestore persistence', err);
                }
            }

            /*
            if (rtdb) {
                try {
                    await rtdb.terminate();
                    console.log('successfully terminated rtdb');
                } catch (err) {
                    console.log('could not terminate rtdb', err);
                }
            }

            if (fireAuth) {
                try {
                    await fireAuth.terminate();
                    console.log('successfully terminated fireauth');
                } catch (err) {
                    console.log('could not terminate storage', err);
                }
            }
            */

            resetFirebaseComponents();
        } else {
            console.log('firebase app not found!');
        }
    };

    useEffect(() => {
        console.log('-----> rtdb:', rtdb);
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
    }, [fireAuth, firestore, rtdb]);

    return (
        <FireContext.Provider value={{
            auth: fireAuth,
            firestore,
            rtdb,
            storage,
            reset,
        }}>
            {children}
        </FireContext.Provider>
    );
};

export default FireProvider;
