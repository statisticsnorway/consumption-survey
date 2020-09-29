import { openDB } from 'idb';
import {
    CONSUMPTION_DB,
    PREFERENCES_STORE,
    ConsumptionSchema,
} from './schema';

const dbHandle = openDB<ConsumptionSchema>(CONSUMPTION_DB, 1, {
    upgrade(database, oldVersion, newVersion, transaction) {
        database.createObjectStore(PREFERENCES_STORE);
    },
});

export const preferencesStore = {
    async get (key) {
        return (await dbHandle).get(PREFERENCES_STORE, key);
    },
    async set (key, val) {
        return (await dbHandle).put(PREFERENCES_STORE, key, val);
    },
    async delete (key) {
        return (await dbHandle).delete(PREFERENCES_STORE, key);
    },
    async clear () {
        return (await dbHandle).clear(PREFERENCES_STORE);
    },
    async keys () {
        return (await dbHandle).getAllKeys(PREFERENCES_STORE);
    }
};
