export type Vendor = {
    name?: string;
    raw_name?: string;
};

export type LineItem = {
    description: string;
    quantity: string;
    unit_of_measure: string;
    price: string;
    total: string;
    id: string;
};

export type ReceiptScanResult = {
    line_items: LineItem[];
    date: string;
    vendor: Vendor;
    total: number;
};

export type OcrResults = {
    [receiptId: string]: ReceiptScanResult;
};
