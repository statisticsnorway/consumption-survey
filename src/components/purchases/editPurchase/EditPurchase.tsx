import { ReactNode, useContext, useEffect, useState } from 'react';
import Workspace from '../../layout/workspace/Workspace';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import usePurchases from '../../../hocs/usePurchases';
import { ItemType, PurchaseStatus, PurchaseType, ReceiptInfo } from '../../../firebase/model/Purchase';
import { OpHeader } from '../../layout/header/Header';
import PurchaseMeta from './PurchaseMeta';
import ItemsTable from './ItemsTable';
import ReceiptPopup from '../../receipts/ReceiptPopup';
import { LayoutContext } from '../../../uiContexts';
import { MessagePanelType } from '../../common/blocks/MessagePanel';
import DeletePurchaseDialog from '../support/DeletePurchaseDialog';
import { PATHS } from '../../../uiConfig';
import { krCents } from '../../../utils/jsUtils';

import styles from '../styles/editPurchase.module.scss'

export type EditPurchaseProps = {
    purchaseId: string;
};

const EditPurchase = ({purchaseId}: EditPurchaseProps) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');
    const {t: ct} = useTranslation('common');
    const {t: ht} = useTranslation('home');

    const {purchases, editPurchase, deletePurchase} = usePurchases();
    const [purchase, setPurchase] = useState<PurchaseType>();

    const [values, setValues] = useState<PurchaseType>();
    const [dirty, setDirty] = useState(false);

    const [showReceiptPopup, setShowReceiptPopup] = useState(false);
    const {showMessagePanel, hideMessagePanel} = useContext(LayoutContext);
    const [showPurchaseDeleteConfirm, setShowPurchaseDeleteConfirm] = useState<boolean>(false);

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

    const computeTotal = (items) =>
        items.reduce((acc, item) =>
            acc + (Number(item.amount)* Number(item.qty)), 0);

    const removeItem = (item) => {
        const {idx, id} = item;
        const {items: orig} = values;
        const items = orig.filter(it =>
                it.id ? (it.id !== id) : (it.idx !== idx));

        const amount = computeTotal(items);

        onUpdate({ items, amount });
    };

    const onItemQtyChange = (item: ItemType, newQty: number) => {
        if (newQty === 0) {
            console.log('item will be removed');
            removeItem(item);
        } else {
            const items = values.items.map(i => {
                const match = (x) =>
                    x.id ? x.id === item.id : x.idx === item.idx;

                return match(i) ? {...i, qty: `${newQty}`} : i;
            });

            const amount = computeTotal(items);

            onUpdate({items, amount})
        }
    };

    const onItemUpdate = (oldValues: ItemType, newValues: ItemType) => {
        console.log(oldValues, '=>', newValues);

        const items = values.items.map(i => {
            const match = (x) =>
                x.id ? x.id === oldValues.id : x.idx === oldValues.idx;

            return match(i) ? newValues : i;
        });

        const amount = computeTotal(items);

        onUpdate({ items, amount });
    };

    const onItemAdd = (newItem: ItemType) => {
        const items = [
            ...values.items,
            {...newItem, idx: values.items.length},
        ];

        onUpdate({
            items,
            amount: computeTotal(items)
        });
    };

    const initializeHeader = () => {
        setHeaderComp(
            <OpHeader
                title={t('editPurchase.title')}
                action={{
                    title: t('editPurchase.delete'),
                    onClick: () => {
                        setShowPurchaseDeleteConfirm(true);
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
                <ItemsTable
                    items={values.items}
                    ocrTotal={krCents(values.amount)}
                    onItemQtyChange={onItemQtyChange}
                    onItemUpdate={onItemUpdate}
                    onNewItem={onItemAdd}
                />
                {editPurchaseCTAComp}
            </div>
            <DeletePurchaseDialog
                purchase={purchase}
                show={showPurchaseDeleteConfirm}
                onConfirm={() => {
                    try {
                        deletePurchase(values)
                            .then(() => {
                                console.log('purchase deleted', values.id);
                                setShowPurchaseDeleteConfirm(false);
                                router.push(PATHS.CONSUMPTION);
                            });
                    } catch (err) {
                        const msg = t('deletePurchase.error');
                        console.log(msg, err);
                        showMessagePanel(MessagePanelType.ERROR, msg + ' ' + err, false);
                    }
                }}
                onCancel={() => {
                    setShowPurchaseDeleteConfirm(false);
                }}
            />
        </Workspace>
    ) : null;
};

export default EditPurchase;
