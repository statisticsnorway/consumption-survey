import { useState, useEffect, useContext } from 'react';
import fb from './init';
import { FireContext } from '../contexts';
import { AppContext } from '../uiContexts';

const FireProvider = ({ children }) => {
    const [fireAuth, setFireAuth] = useState(null);
    const [firestore, setFirestore] = useState(null);
    const [rtdb, setRtdb] = useState(null);
    const [storage, setStorage] = useState(null);
    const { envVars } = useContext(AppContext);
    const [initComplete, setInitComplete] = useState(false);

    useEffect(() => {
        console.log('--------------------------------------');
        console.log('Environment Variables for FireProvider', envVars);
        console.log('--------------------------------------');
    }, []);

    useEffect(() => {
        setFireAuth(fb.auth());
        setFirestore(fb.firestore());
        setRtdb(fb.database());
        setStorage(fb.storage());
    }, []);

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
