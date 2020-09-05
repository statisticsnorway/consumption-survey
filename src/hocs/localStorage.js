import { useState } from 'react';

export const useLocalStorage = (key, defaultValue = '') => {
    if (!key) {
        throw new Error('useLocalStorage: key is mandatory');
    }

    const [persistedValue, setPersistedValue] = useState(() => {
        try {
            const persisted = window.localStorage.getItem(key);
            return persisted ? JSON.parse(persisted) : defaultValue;
        } catch (error) {
            console.log(`Could not fetch ${key} from localStorage, returning defaultValue`);
            return defaultValue;
        }
    });

    const updatePersistedValue = newValue => {
        try {
            const valueToPersist = (typeof newValue === 'function') ?
                newValue(persistedValue) :
                newValue;

            setPersistedValue(valueToPersist);

            window.localStorage.setItem(key, JSON.stringify(valueToPersist));
        } catch (error) {
            console.log(`Could not save ${key} to localStorage`, JSON.stringify(error));
        }
    };

    return [persistedValue, updatePersistedValue]
};
