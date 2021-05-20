import { ReactNode, ReactNodeArray, useContext, useEffect, useState } from 'react';
import { useDB, PouchDB } from 'react-pouchdb';
import { UserContext } from '../contexts';
import { PouchProviderProps } from './PouchDBProvider';

type DatabasesType = {
    [dbName: string]: PouchDB;
}

export type UsePouchProps = {
    dbNames: string[],
};

const usePouch = ({dbNames}: UsePouchProps) => {
    const {userInfo} = useContext(UserContext);
    const [dbs, setDbs] = useState<DatabasesType>(dbNames.reduce((acc, dbName) => {
        const userDbName = `${userInfo.userName}_${dbName}`;
        return {
        ...acc,
            [userDbName]: useDB(userDbName),
        }
    }, {}));

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
    return {dbs, getDB, ready};
};

export default usePouch;
