import { LineItem, OcrResults, ReceiptScanResult } from '../firebase/model/Veryfi';
import { ItemType, PurchaseStatus, PurchaseType } from '../firebase/model/Purchase';
import { OCR_DATE_FORMAT, parseDate } from './dateUtils';

export const extractItems = (lineItems: LineItem[]): ItemType[] => {
    return lineItems.map((li, idx) => ({
        name: li.description,
        qty: li.quantity,
        units: li.unit_of_measure,
        amount: li.price || li.total,
        id: li.id,
        idx,
    }));
};

export const extractReceipts = (ocrResults: OcrResults): ReceiptScanResult => {
    const receiptKeys = Object.keys(ocrResults);
    return ocrResults[receiptKeys[0]];
};

export type OcrResultsExtract = {
    purchase: PurchaseType,
    errors: any,
};

export const extractPurchaseInfo = (ocrResults: OcrResults, registeredTime: string): OcrResultsExtract => {
    const receiptInfo = extractReceipts(ocrResults);
    const {line_items, date, vendor, total} = receiptInfo;

    const purchase = {
        name: vendor.name || vendor.raw_name || null,
        purchaseDate: date ? parseDate(date, OCR_DATE_FORMAT).toISOString() : registeredTime,
        amount: total,
        items: extractItems(line_items),
        status: PurchaseStatus.OCR_COMPLETE,
    };

    const errors = {
        purchaseDate: date ? '' : 'error',
        name: (vendor && (vendor.name || vendor.raw_name)) ? '' : 'error',
    };

    return { purchase, errors };
};
