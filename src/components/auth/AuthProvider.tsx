import { useContext, useEffect, useState } from 'react';
import { SUPPORTED_PREFERENCES, PreferencesContext, AuthContext } from '../common/contexts';

const AuthProvider = ({children}) => {
    const [pin, setPin] = useState('');
    const {preferences, getPreference, setPreference} = useContext(PreferencesContext);

    useEffect(() => {
        console.log('[AuthContext] INIT : load');
        getPreference(SUPPORTED_PREFERENCES.PIN)
            .then(val => {
                if (val) {
                    console.log('Fetched', val);
                    setPin(val);
                } else {
                    console.log('No pref found, ignoring');
                }
            });
    }, []);

    useEffect(() => {
        console.log('[AuthContext] PIN changed : saving...');
        setPreference(SUPPORTED_PREFERENCES.PIN, pin)
            .then((res) => {
                console.log('Saved. check db');
            })
    }, [pin]);

    useEffect(() => {
        console.log('[AuthContext] Prefs Changed. updating state...');
        // TODO : DRY
        getPreference(SUPPORTED_PREFERENCES.PIN)
            .then(val => {
                if (val) {
                    console.log('new pin', val);
                    setPin(val);
                } else {
                    console.log('PIN does not seem to have changed, ignoring');
                }
            })
    }, [preferences])

    return (
        <AuthContext.Provider value={{pin, setPin}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
