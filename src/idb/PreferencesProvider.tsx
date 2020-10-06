import { useEffect, useState } from 'react';
import { get, set, getAll } from './preferences';
import { PreferencesContext } from '../components/common/contexts';

const PreferencesProvider = ({ children }) => {
    const [preferences, setPreferences] = useState({});

    useEffect(() => {
        getAll().then(entries => {
            console.log('loaded', entries);
            setPreferences(entries);
        })
    }, []);

    const getPreference = (key: string):any => {
        return get(key);
    };

    const setPreference = (key: string, value: any) => {
        return set(key, value);
    };

    return (
        <PreferencesContext.Provider value={{
            preferences, setPreference, getPreference,
        }}>
            {children}
        </PreferencesContext.Provider>
    );
};

export default PreferencesProvider;
