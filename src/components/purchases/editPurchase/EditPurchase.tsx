import { ReactNode, useEffect, useState } from 'react';
import Workspace from '../../layout/workspace/Workspace';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import usePurchases from '../../../hocs/usePurchases';
import { PurchaseType, ReceiptInfo } from '../../../firebase/model/Purchase';

import styles from './editPurchase.module.scss'
import { OpHeader } from '../../layout/header/Header';
import PurchaseMeta from './PurchaseMeta';
import ItemsTable from './ItemsTable';

export type EditPurchaseProps = {
    purchaseId: string;
};

const EditPurchase = ({purchaseId}: EditPurchaseProps) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');
    const {t: ct} = useTranslation('common');
    const {t: ht} = useTranslation('home');

    const {purchases} = usePurchases();
    const [purchase, setPurchase] = useState<PurchaseType>();

    useEffect(() => {
        if (purchaseId) {
            setPurchase(purchases.find(p => p.id === purchaseId));
        }
    }, [purchaseId]);

    useEffect(() => {
        if (purchase) {
            initializeHeader();

            const {receipts, items, status, purchaseDate, name} = purchase;
            initializePurchaseMeta(purchaseDate, name);

            if (receipts && receipts.length > 0) {
                initializeReceiptPreview(receipts[0]);
            }

            initializeLineItems(items);
        }
    }, [purchase]);


    const initializeHeader = () => {
        setHeaderComp(
            <OpHeader
                title={t('editPurchase.title')}
                action={{
                    title: t('editPurchase.delete'),
                    onClick: () => {
                        console.log('deleeting', purchaseId);
                    }
                }}
            />
        );
    };

    const initializeReceiptPreview = (receipt: ReceiptInfo) => {
        const {imageName, imageId, previewUrl} = receipt;
        setReceiptPreviewComp(
            <div className={styles.receiptPreview}>
                {previewUrl && <img src={receipt.previewUrl} className={styles.thumbnail}/>}
                <span className={styles.infoText}>{t('editPurchase.scannedReceipt')}</span>
            </div>
        )
    };

    const initializePurchaseMeta = (purchaseDate, name) => {
        setPurchaseMetaComp(
            <div className={styles.purchaseMeta}>
                <PurchaseMeta
                    name={name}
                    purchaseDate={purchaseDate}
                />
            </div>
        )
    };

    const initializeLineItems = (lineItems) => {
        setLineItemsComp(
            <ItemsTable items={lineItems} />
        );
    };

    /**
     * Render components
     */
    const [headerComp, setHeaderComp] = useState<ReactNode>();
    const [receiptPreviewComp, setReceiptPreviewComp] = useState<ReactNode>();
    const [purchaseMetaComp, setPurchaseMetaComp] = useState<ReactNode>();
    const [lineItemsComp, setLineItemsComp] = useState<ReactNode>();
    const [editPurchaseCTAComp, setEditPurchaseCTAComp] = useState<ReactNode>();

    return (
        <Workspace headerComp={headerComp} showFooter={false} style={{padding: 0}}>
            <div className={styles.editPurchase}>
                {receiptPreviewComp}
                {purchaseMetaComp}
                {lineItemsComp}
                {editPurchaseCTAComp}
            </div>
        </Workspace>
    );
};

export default EditPurchase;
