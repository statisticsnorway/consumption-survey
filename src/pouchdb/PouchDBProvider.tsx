import { useDB, PouchDB } from 'react-pouchdb';
import { ReactNode, ReactNodeArray, useContext, useEffect, useState } from 'react';
import { PouchDBContext } from '../uiContexts';
import { UserContext } from '../contexts';
import { DATABASE_PURCHASE_RECEIPTS, DATABASE_RECEIPTS } from '../uiConfig';

const DEFAULT_DB_NAME = '_default_db';

export type PouchDBProviderProps = {
    dbName?: string;
    children: ReactNode | ReactNodeArray;
}

type DatabasesType = {
    [dbName: string]: PouchDB;
}

export type PouchProviderProps = {
    dbNames?: string[],
    children: ReactNode | ReactNodeArray;
}

const PouchDBProvider = ({dbNames = [DATABASE_RECEIPTS, DATABASE_PURCHASE_RECEIPTS], children}: PouchProviderProps) => {
    const {userInfo} = useContext(UserContext);
    const [dbs, setDbs] = useState<DatabasesType>(dbNames.reduce((acc, dbName) => ({
        ...acc,
        [`${userInfo.userName}_${dbName}`]: useDB(`${userInfo.userName}_${dbName}`),
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

    const getDB = (dbName) => dbs[`${userInfo.userName}_${dbName}`];

    console.log('pouch dbs', dbs);

    return (
        <PouchDBContext.Provider value={{getDB, ready}}>
            {children}
        </PouchDBContext.Provider>
    )
};

export default PouchDBProvider;
