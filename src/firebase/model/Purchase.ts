export type ItemType = {
    name: string;
    qty: string;
    units: string;
    kr: string;
    cents: string;
    code?: string;
    searchTermId?: number;
    id?: string;
    idx?: number;
};

export type PurchaseType = {
    id?: string;
    where: string;
    items: ItemType[];
    when: Date;
    totalPrice: number;
};

export type PurchasesByDate = {
    [date: string]: PurchaseType[];
};

export type PurchaseGroupByDate = {
    readonly [date: string]: readonly PurchaseType[];
};
