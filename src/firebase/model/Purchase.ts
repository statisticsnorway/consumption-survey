export type ItemType = {
    name: string;
    qty: string;
    units: string;
    amount: string;
    code?: string;
    searchTermId?: number;
    id?: string;
    idx?: number;
};

export type PurchaseType = {
    id?: string;
    name: string;
    items: ItemType[];
    purchaseDate: string;
    amount: number;
    registeredTime?: string;
};

export const INIT_PURCHASE = {
    name: '',
    items: [],
    purchaseDate: new Date().toISOString(),
    amount: 0,
};

export type PurchasesByDate = {
    [date: string]: PurchaseType[];
};

export type PurchaseGroupByDate = {
    readonly [date: string]: readonly PurchaseType[];
};
