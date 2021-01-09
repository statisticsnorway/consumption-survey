export type ItemType = {
    name: string;
    qty: string;
    units: string;
    kr: string;
    cents: string;
    krCents: string;
    code?: string;
    searchTermId?: number;
    id?: string;
    idx?: number;
};

export type PurchaseType = {
    id?: string;
    where: string;
    items: ItemType[];
    when: string;
    totalPrice: number;
};

export const INIT_PURCHASE = {
    where: '',
    items: [],
    when: new Date().toISOString(),
    totalPrice: 0,
};

export type PurchasesByDate = {
    [date: string]: PurchaseType[];
};

export type PurchaseGroupByDate = {
    readonly [date: string]: readonly PurchaseType[];
};
