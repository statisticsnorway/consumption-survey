import { createContext } from 'react';

export type LayoutContextType = {
    showUpdateSnackbar: boolean;
};

export const LayoutContext = createContext({} as LayoutContextType);

export type PouchDBContextType = {
    getDB: (name: string) => PouchDB.Database;
    ready: boolean;
};

export const PouchDBContext = createContext({} as PouchDBContextType);
