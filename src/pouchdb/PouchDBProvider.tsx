import { useDB } from 'react-pouchdb';
import { ReactNode, ReactNodeArray } from 'react';
import { PouchDBContext } from '../uiContexts';

const DEFAULT_DB_NAME = "_default_db";

export type PouchDBProviderProps = {
    dbName?: string;
    children: ReactNode | ReactNodeArray;
}

const PouchDBProvider = ({ dbName = DEFAULT_DB_NAME, children }) => {
    const db = useDB(dbName);

    return (
        <PouchDBContext.Provider value={{ db }}>
            {children}
        </PouchDBContext.Provider>
    )
};

export default PouchDBProvider;
