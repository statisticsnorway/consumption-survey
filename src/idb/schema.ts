import { DBSchema } from 'idb';

// --- main db ---
export const CONSUMPTION_DB = 'consumption';

// --- db stores ---
export const PREFERENCES_STORE = 'preferences';
export const RECEIPTS_STORE = 'receipts';

// --- preferences : types ---
export type SUPPORTED_PREFERENCES = 'pin'
    | 'lang';

// --- receipts : types ---
export type ITEM_TYPE = {
    name: string;
    quantity: number;
    cost: number;
};

export type RECEIPT_TYPE = {
    date: Date,
    id: number,
    vendor: string,
    items: ITEM_TYPE[],
};

export interface ConsumptionSchema extends DBSchema {
    // --- preferences store ---
    [PREFERENCES_STORE]: {
        key: SUPPORTED_PREFERENCES;
        value: string;
    },

    // --- receipts store ---
    [RECEIPTS_STORE]: {
        key: number,
        value: RECEIPT_TYPE,
    }
}

