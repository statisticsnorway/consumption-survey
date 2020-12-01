import { useState, useEffect, useContext } from 'react';
import fb from './init';
import { FireContext } from '../contexts';
import { AppContext } from '../uiContexts';

const FireProvider = ({ children }) => {
    const [fireAuth, setFireAuth] = useState(null);
    const [firestore, setFirestore] = useState(null);
    const [storage, setStorage] = useState(null);
    const { envVars } = useContext(AppContext);

    useEffect(() => {
        console.log('--------------------------------------');
        console.log('Environment Variables for FireProvider', envVars);
        console.log('--------------------------------------');
    }, []);

    useEffect(() => {
        setFireAuth(fb.auth());
        setFirestore(fb.firestore());
        setStorage(fb.storage());
    }, []);

    return (
        <FireContext.Provider value={{
            auth: fireAuth,
            firestore,
            storage,
        }}>
            {children}
        </FireContext.Provider>
    );
};

export default FireProvider;
