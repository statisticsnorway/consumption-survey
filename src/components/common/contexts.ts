import { createContext } from 'react';

export enum SUPPORTED_PREFERENCES {
    PIN = 'pin',
    LANG = 'lang',
};

export type AuthContextType = {
    [SUPPORTED_PREFERENCES.PIN]: string;
setPin: (pin: string) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export type PreferencesType = {
    preferences: {
        [key: string]: any;
    };
    getPreference: (key: string) => Promise<any>;
    setPreference: (key: string, value: any) => Promise<SUPPORTED_PREFERENCES>;
};

export const PreferencesContext = createContext({} as PreferencesType);
