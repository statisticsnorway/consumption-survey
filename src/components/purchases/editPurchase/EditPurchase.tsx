import { ReactNode, useContext, useEffect, useState } from 'react';
import Workspace from '../../layout/workspace/Workspace';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import usePurchases from '../../../hocs/usePurchases';
import { PurchaseStatus, PurchaseType, ReceiptInfo } from '../../../firebase/model/Purchase';

import styles from './editPurchase.module.scss'
import { OpHeader } from '../../layout/header/Header';
import PurchaseMeta from './PurchaseMeta';
import ItemsTable from './ItemsTable';
import ReceiptPopup from '../../receipts/ReceiptPopup';
import { LayoutContext } from '../../../uiContexts';
import { MessagePanelType } from '../../common/blocks/MessagePanel';

export type EditPurchaseProps = {
    purchaseId: string;
};

const EditPurchase = ({purchaseId}: EditPurchaseProps) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');
    const {t: ct} = useTranslation('common');
    const {t: ht} = useTranslation('home');

    const {purchases, editPurchase} = usePurchases();
    const [purchase, setPurchase] = useState<PurchaseType>();

    const [values, setValues] = useState<PurchaseType>();
    const [dirty, setDirty] = useState(false);

    const [showReceiptPopup, setShowReceiptPopup] = useState(false);
    const {showMessagePanel, hideMessagePanel} = useContext(LayoutContext);

    useEffect(() => {
        if (purchaseId) {
            setPurchase(purchases.find(p => p.id === purchaseId));
        }
    }, [purchaseId]);

    useEffect(() => {
        if (purchase) {
            setValues(purchase);

        }
    }, [purchase]);

    useEffect(() => {
        if (values) {
            initializeHeader();

            const {receipts, items, status, purchaseDate, name} = values;
            initializePurchaseMeta(purchaseDate, name);

            if (receipts && receipts.length > 0) {
                initializeReceiptPreview(receipts[0]);
            }

            initializeLineItems(items);
            initializeCTAComp();
        }
    }, [values]);

    useEffect(() => {

    }, [showReceiptPopup]);

    const onUpdate = (change) => {
        setValues({
            ...values,
            ...change,
        });
        setDirty(true);
    };

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
            <div className={styles.receiptPreview} onClick={() => {
                setShowReceiptPopup(true);
            }}>
                {previewUrl && <img src={receipt.previewUrl} className={styles.thumbnail}/>}
                <span className={styles.infoText}>{t('editPurchase.scannedReceipt')}</span>
            </div>
        )
    };

    const initializePurchaseMeta = (purchaseDate, name) => {
        setPurchaseMetaComp(
            <div className={styles.purchaseMeta}>
                <PurchaseMeta
                    name={values.name}
                    purchaseDate={values.purchaseDate}
                    registeredTime={values.registeredTime}
                    onUpdate={onUpdate}
                />
            </div>
        )
    };

    const initializeLineItems = (lineItems) => {
        setLineItemsComp(
            <ItemsTable items={lineItems}/>
        );
    };

    const validateAllFields = () => {
        if (!values) {
            return false;
        }

        const {name, purchaseDate, registeredTime} = values;

        // ToDo: DRY - cleaner way to validate all fields at one place, please!
        //       options: formik might be an overkill. 'Yup' schema validation maybe ?
        return name &&
            (purchaseDate && (purchaseDate !== registeredTime));
    };

    useEffect(() => {
        initializeCTAComp();
    }, [dirty]);

    const savePurchase = () => {
        const receiptsForFirebase = values.receipts
            ? values.receipts.map(r => ({
                imageName: r.imageName,
                imageId: r.imageId,
                contentType: r.contentType,
                status: r.status,
            }))
            : null;

        try {
            editPurchase(values.id, {
                ...values,
                receipts: receiptsForFirebase,
                status: PurchaseStatus.COMPLETE,
                name: values.name.endsWith('3') ? undefined : values.name,
            })
                .then(() => {
                    const msg = t('editPurchase.saveSuccess');
                    console.log(msg);
                    showMessagePanel(MessagePanelType.SUCCESS, msg);
                });
        } catch (err) {
            const msg = t('editPurchase.saveError');
            console.log(msg, err);
            showMessagePanel(MessagePanelType.ERROR, msg + ' ' + err, false);
        };
    };

    const initializeCTAComp = () => {
        const enabled = dirty && validateAllFields();

        setEditPurchaseCTAComp(
            <div className={styles.editPurchaseCTA}>
                <button
                    className={`ssb-btn primary-btn ${styles.saveButton}`}
                    disabled={!enabled}
                    onClick={savePurchase}
                >
                    {(values && (values.status === PurchaseStatus.OCR_PENDING_USER_APPROVAL))
                        ? t('addPurchase.approveChanges')
                        : t('addPurchase.save')
                    }
                </button>
            </div>
        )
    };

    /**
     * Render components
     */
    const [headerComp, setHeaderComp] = useState<ReactNode>();
    const [receiptPreviewComp, setReceiptPreviewComp] = useState<ReactNode>();
    const [purchaseMetaComp, setPurchaseMetaComp] = useState<ReactNode>();
    const [lineItemsComp, setLineItemsComp] = useState<ReactNode>();
    const [editPurchaseCTAComp, setEditPurchaseCTAComp] = useState<ReactNode>();

    console.log('current', values);

    return values ? (
        <Workspace headerComp={headerComp} showFooter={false} style={{padding: 0}}>
            <div className={styles.editPurchase}>
                {receiptPreviewComp}
                <ReceiptPopup
                    show={showReceiptPopup}
                    receipt={values.receipts[0]}
                    onClose={() => {
                        setShowReceiptPopup(false);
                    }}
                    onCancel={() => {
                        setShowReceiptPopup(false);
                    }}
                />
                {purchaseMetaComp}
                {lineItemsComp}
                {editPurchaseCTAComp}
            </div>
        </Workspace>
    ) : null;
};

export default EditPurchase;
