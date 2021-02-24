import { useDB, PouchDB } from 'react-pouchdb';
import { ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import { PouchDBContext } from '../uiContexts';

const DEFAULT_DB_NAME = '_default_db';

export type PouchDBProviderProps = {
    dbName?: string;
    children: ReactNode | ReactNodeArray;
}

type DatabasesType = {
    [dbName: string]: PouchDB;
}

export type PouchProviderProps = {
    dbNames: string[],
    children: ReactNode | ReactNodeArray;
}

const PouchDBProvider = ({dbNames = [DEFAULT_DB_NAME], children}: PouchProviderProps) => {
    const [dbs, setDbs] = useState<DatabasesType>(dbNames.reduce((acc, dbName) => ({
        ...acc,
        [dbName]: useDB(dbName)
    }), {}));

    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if (dbs) {
            setReady(true);
            console.log('pouch ready for use', dbs);
        } else {
            console.log('pouch not ready yet');
        }
    }, [dbs]);

    const getDB = (dbName) => dbs[dbName];

    console.log('pouch dbs', dbs);

    return (
        <PouchDBContext.Provider value={{getDB, ready}}>
            {children}
        </PouchDBContext.Provider>
    )
};

export default PouchDBProvider;
