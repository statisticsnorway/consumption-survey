import { openDB } from 'idb'
import { CONSUMPTION_DB, PREFERENCES_STORE, ConsumptionSchema } from './schema'

const dbHandle = openDB<ConsumptionSchema>(CONSUMPTION_DB, 1, {
  upgrade(database, oldVersion, newVersion, transaction) {
    database.createObjectStore(PREFERENCES_STORE)
  },
})

export const get = async (key) => (await dbHandle).get(PREFERENCES_STORE, key)

export const keys = async () => (await dbHandle).getAllKeys(PREFERENCES_STORE)

export const set = async (key, val) =>
  (await dbHandle).put(PREFERENCES_STORE, val, key)

export const getAll = async () => (await dbHandle).getAll(PREFERENCES_STORE)

/*
async delete (key) {
    return (await dbHandle).delete(PREFERENCES_STORE, key);
},
async clear () {
    return (await dbHandle).clear(PREFERENCES_STORE);
},
 */
