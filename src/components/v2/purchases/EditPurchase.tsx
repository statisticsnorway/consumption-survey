import { ChangeEvent, useContext, useEffect, useState } from 'react';
import usePurchases from '../../../hocs/usePurchases';
import { ItemType, PurchaseStatus, PurchaseType, ReceiptInfo } from '../../../firebase/model/Purchase';
import { useTranslation } from 'react-i18next';
import { LineItem, OcrResults, ReceiptScanResult } from '../../../firebase/model/Veryfi';
import { OCR_DATE_FORMAT, parseDate } from '../../../utils/dateUtils';
import { LayoutContext } from '../../../uiContexts';
import AddPurchaseTitleZone from './AddPurchaseTitleZone';
import ItemsTable from './ItemsTable';
import Loader from '../../common/Loader';

import styles from './styles/editPurchase.module.scss';
import useReceipts from '../../../hocs/useReceipts';

export type EditPurchaseProps = {
    purchaseId: string;
};

const EditPurchase = ({purchaseId}: EditPurchaseProps) => {
    const {purchases, editPurchase} = usePurchases();
    const {getReceiptFromPouchDB, getReceiptWithImageUrl} = useReceipts();
    const {t} = useTranslation('purchases');
    const {setHeaderContent} = useContext(LayoutContext);
    const [purchase, setPurchase] = useState<PurchaseType>(null);
    const [values, setValues] = useState<PurchaseType>(null);
    const [error, setError] = useState<string>(null);

    useEffect(() => {
        if (purchases) {
            const match = purchases.find(p => p.id === purchaseId);
            if (match) {
                setPurchase(match);
            } else {
                setError(`${t('error.purchase.notFound')}`);
            }
        }
    }, [purchases]);

    const extractItems = (lineItems: LineItem[]): ItemType[] => {
        return lineItems.map((li, idx) => ({
            name: li.description,
            qty: li.quantity,
            units: li.unit_of_measure,
            amount: li.price || li.total,
            id: li.id,
            idx,
        }));
    };

    const extractReceipts = (ocrResults: OcrResults): ReceiptScanResult => {
        const receiptKeys = Object.keys(ocrResults);
        return ocrResults[receiptKeys[0]];
    };

    const extractPurchaseInfo = (ocrResults: OcrResults): PurchaseType => {
        const receiptInfo = extractReceipts(ocrResults);
        const {line_items, date, vendor, total} = receiptInfo;

        return {
            name: vendor.name || vendor.raw_name || '??',
            purchaseDate: parseDate(date, OCR_DATE_FORMAT).toISOString(),
            amount: total,
            items: extractItems(line_items),
            status: PurchaseStatus.OCR_COMPLETE,
        };
    };

    useEffect(() => {
        if (purchase) {
            console.log('showing', purchase);
            if ((purchase.status === PurchaseStatus.OCR_COMPLETE) && purchase.ocrResults) {
                setValues(extractPurchaseInfo(purchase.ocrResults));
            } else {
                setValues(purchase);
            }

            if (purchase.receipts) {
                purchase.receipts.forEach(r => {
                    console.log('loading image', r.imageId, r.imageName, r.contentType);
                    getReceiptWithImageUrl(r.imageId, r.imageName)
                        .then(withImg => {
                            setValues(prevState => {
                                const curr = prevState.receipts || [];
                                return {
                                    ...prevState,
                                    receipts: [
                                        ...curr,
                                        withImg,
                                    ],
                                };
                            });
                        });
                });
            }
        }
    }, [purchase]);

    const updateField = (fieldName: keyof PurchaseType) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [fieldName]: e.target.value,
        });
    };

    return values ? (
        <div className={styles.editPurchase}>
            <AddPurchaseTitleZone
                name={values.name}
                date={values.purchaseDate}
                receipts={values.receipts}
                onAddReceipt={() => { /* TODO */
                }}
                updateField={updateField}
            />
            <ItemsTable
                items={values.items}
            />
        </div>
    ) : <Loader/>;
};

export default EditPurchase;
