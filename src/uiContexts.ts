import { createContext } from 'react';

export type LayoutContextType = {
    showUpdateSnackbar: boolean;
    showMessage: (string) => void;
    clearMessages: () => void;
};

export const LayoutContext = createContext({} as LayoutContextType);

export type PouchDBContextType = {
    getDB: (name: string) => PouchDB.Database;
    ready: boolean;
};

export const PouchDBContext = createContext({} as PouchDBContextType);
