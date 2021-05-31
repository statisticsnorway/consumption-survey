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

/**
 * TODO: some of the statuses are probably ideal on
 *    individual receipt(s). But we take it up after Pilot, maybe ?
 */
export enum PurchaseStatus {
    /** can be manual or from receipt */
    CREATED = 'CREATED',

    /** manual registration: status is complete on save */
    /** from receipt: status is complete only after ocr_validated */
    COMPLETE = 'COMPLETE',

    /** Saved to backend service */
    FBU_COMPLETE = 'FBU_COMPLETE',

    /**
     * when created from a receipt:
     * - waiting for network: device is offline we could not upload
     *     image to the network/svc yet
     * - in progress: we have uploaded the image, hope cloud function
     *     kicks off fine
     * - ocr_complete: results obtained from svc and attached
     *     to purchase
     * - ocr_validated: user has been presented with results and
     *     has approved it
     *     Purchase can be marked as COMPLETE after ocr_validated
     */
    OCR_WAITING_NETWORK = 'OCR_WAITING_NETWORK',
    OCR_UPLOAD_FAILED = 'OCR_UPLOAD_FAILED',
    OCR_IN_PROGRESS = 'OCR_IN_PROGRESS',
    OCR_ERROR = 'OCR_ERROR',
    OCR_COMPLETE = 'OCR_COMPLETE',
    OCR_PENDING_USER_APPROVAL = 'OCR_PENDING_USER_APPROVAL',
    OCR_VALIDATED = 'OCR_VALIDATED',

    /** abandoned registration */
    DISCARDED = 'DISCARDED',
};

export const isPurchaseComplete = (status: PurchaseStatus) =>
    [PurchaseStatus.COMPLETE, PurchaseStatus.FBU_COMPLETE].includes(status);

/**
 * ToDo: This looks exactly like PurchaseStatus right  now.
 *    - PurchaseStatus must be changed to incorporate and handle
 *      status of mulitple receipts.
 */
export enum ReceiptStatus {
    CREATED,
    COMPLETE,
    OCR_WAITING_NETWORK,
    OCR_UPLOAD_FAILED,
    OCR_IN_PROGRESS,
    OCR_ERROR,
    OCR_COMPLETE,
    OCR_VALIDATED,
    DISCARDED,
}

export const OCR_INCOMPLETE_STATUSES = [
    ReceiptStatus.OCR_IN_PROGRESS,
    ReceiptStatus.OCR_WAITING_NETWORK,
];

export const OCR_ERROR_STATUSES = [
    ReceiptStatus.OCR_UPLOAD_FAILED,
    ReceiptStatus.OCR_ERROR,
];

export type ReceiptInfo = {
    imageId: string;
    imageName: string;
    contentType?: string;
    image?: Blob;
    previewUrl?: string;
    status: ReceiptStatus;
};

export type PurchaseType = {
    id?: string;
    name?: string;
    items?: ItemType[];
    purchaseDate?: string;
    amount?: number;
    registeredTime?: string;
    ocrResults?: any;
    receipts?: ReceiptInfo[];
    status: PurchaseStatus;
};

export type Receipt = {
    ref?: string;
    attachmentId: string;
    name: string;
    contentType: string;
    blob: Blob;
    uploadedToFirebase?: boolean;
};

export type PurchaseTypeByReceipts = {
    id?: string;
    receipts: Receipt[];
};

export const INIT_PURCHASE = {
    name: '',
    items: [],
    purchaseDate: new Date().toISOString(),
    amount: 0,
    receipts: [],
    status: PurchaseStatus.CREATED,
};

export type PurchasesByDate = {
    [date: string]: PurchaseType[];
};

export type PurchaseGroupByDate = {
    readonly [date: string]: readonly PurchaseType[];
};
