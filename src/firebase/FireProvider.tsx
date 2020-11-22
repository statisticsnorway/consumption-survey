import { useState, useEffect } from 'react';
import fb from './init';
import { FireContext } from '../contexts';

const FireProvider = ({ children }) => {
    const [fireAuth, setFireAuth] = useState(null);
    const [firestore, setFirestore] = useState(null);
    const [storage, setStorage] = useState(null);

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
