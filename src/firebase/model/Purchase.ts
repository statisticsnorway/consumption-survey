export type ItemType = {
    name: string;
    category?: string;
    quantity: number;
    price: number;
};

export type PurchaseType = {
    id: string;
    where: string;
    items: ItemType[];
    when: Date;
    totalPrice: number;
};

export type PurchaseGroupByDate = {
    readonly [date: string]: readonly PurchaseType[];
};
