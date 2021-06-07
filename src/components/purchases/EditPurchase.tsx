import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { INIT_PURCHASE, ItemType, PurchaseStatus, PurchaseType } from '../../firebase/model/Purchase';
import { OpHeader } from '../layout/header/Header';
import PurchaseMeta from './PurchaseMeta';
import { krCents, notEmptyString } from '../../utils/jsUtils';
import { LayoutContext } from '../../uiContexts';
import { MessagePanelType } from '../common/blocks/MessagePanel';
import Workspace from '../layout/workspace/Workspace';
import Loader from '../common/Loader';
import ReceiptPreview from './support/ReceiptPreview';
import usePurchases from '../../hocs/usePurchases';
import ItemsTable from './ItemsTable';
import DeletePurchaseDialog from './support/DeletePurchaseDialog';
import { PATHS } from '../../uiConfig';

import styles from './styles/editPurchase.module.scss';

const EditPurchase = ({purchaseId}) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');
    const {showMessagePanel} = useContext(LayoutContext);
    const [values, setValues] = useState<PurchaseType>(INIT_PURCHASE);
    const [init, setInit] = useState<boolean>(true);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [showPurchaseDeleteConfirm, setShowPurchaseDeleteConfirm] = useState<boolean>(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const {purchases, addPurchase, editPurchase, deletePurchase} = usePurchases();
    const [purchase, setPurchase] = useState<PurchaseType>(null);


    useEffect(() => {
        console.log('at []: init is', init);
        console.log('at []: purchaseId is', purchaseId);
        if (!purchaseId) {
            setInit(false);
        }
    }, []);

    useEffect(() => {
        if (purchaseId && purchases) {
            setPurchase(purchases.find(p => p.id === purchaseId));
        }
    }, [purchases, purchaseId]);

    useEffect(() => {
        if (purchase) {
            setValues(purchase);
        }
    }, [purchase]);

    useEffect(() => {
        if (isDirty) {
            const cs = validateAllFields();
            console.log('[d.v] ', isDirty, values, cs);
            setCanSubmit(cs);
        }
    }, [isDirty, values]);

    const updateValues = (delta) => {
        setValues({
            ...values,
            ...delta
        });

        setIsDirty(true);
    };

    const validateAllFields = () => {
        if (values) {
            const {items} = values;
            if (!items || items.length < 1) {
                return false;
            }

            return (notEmptyString(values.name) && (values.name !== '??')) &&
                (notEmptyString(values.purchaseDate));
        } else {
            return false;
        }
    };

    const computeTotal = (items) =>
        items.reduce((acc, item) =>
            acc + (Number(item.amount) * Number(item.qty)), 0);

    const removeItem = (item) => {
        const {idx, id} = item;
        const {items: orig} = values;
        const items = orig.filter(it =>
            it.id ? (it.id !== id) : (it.idx !== idx));

        const amount = computeTotal(items);

        updateValues({items, amount});
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

            updateValues({items, amount})
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

        updateValues({items, amount});
    };

    const onItemAdd = (newItem: ItemType) => {
        const items = [
            ...values.items,
            {...newItem, idx: values.items.length},
        ];

        updateValues({
            items,
            amount: computeTotal(items)
        });
    };

    const savePurchase = () => {
        console.log('saving ', purchaseId);
        const receiptsForFirebase = values.receipts
            ? values.receipts.map(r => ({
                imageName: r.imageName,
                imageId: r.imageId,
                contentType: r.contentType,
                status: r.status,
            }))
            : null;

        try {
            if (purchaseId) {
                editPurchase(values.id, {
                    ...values,
                    receipts: receiptsForFirebase,
                    status: PurchaseStatus.COMPLETE,
                    name: values.name.endsWith('_xyz_') ? undefined : values.name, // <-- todo _xyz_ test option
                })
                    .then(() => {
                        const msg = t('editPurchase.saveSuccess');
                        console.log(msg);
                        showMessagePanel(MessagePanelType.SUCCESS, msg, true, () => {
                            router.push(PATHS.CONSUMPTION);
                        });
                    })
                    .catch(err => {
                        const msg = t('editPurchase.saveError');
                        console.log(msg, err);
                        showMessagePanel(MessagePanelType.ERROR, msg + ' ' + err, false);
                    });
            } else {
                addPurchase({
                    ...values,
                    receipts: receiptsForFirebase,
                    status: PurchaseStatus.COMPLETE,
                })
                    .then(() => {
                        const msg = t('editPurchase.saveSuccess');
                        console.log(msg);
                        showMessagePanel(MessagePanelType.SUCCESS, msg, true, () => {
                            router.push(PATHS.CONSUMPTION);
                        });
                    })
                    .catch(err => {
                        const msg = t('editPurchase.saveError');
                        console.log(msg, err);
                        showMessagePanel(MessagePanelType.ERROR, msg + ' ' + err, false);
                    });
            }
        } catch (err) {
            const msg = t('editPurchase.saveError');
            console.log(msg, err);
            showMessagePanel(MessagePanelType.ERROR, msg + ' ' + err, false);
        }
    };

    console.log('current values', values);

    return values ? (
        <Workspace
            headerComp={
                <OpHeader
                    title={purchaseId ? t('editPurchase.title') : t('addPurchase.title')}
                    action={purchaseId ? {
                        title: t('editPurchase.delete'),
                        onClick: () => {
                            setShowPurchaseDeleteConfirm(true);
                        },
                        style: { color: '#ED5935' },  // <- red-5; needs to be better handled in design
                    } : null}
                />
            }
            showFooter={false}
            style={{padding: 0}}
        >
            <div className={styles.editPurchase}>
                <ReceiptPreview receipts={values.receipts} text={t('editPurchase.scannedReceipt')}/>
                <PurchaseMeta
                    registeredTime={values.registeredTime}
                    purchaseDate={values.purchaseDate}
                    name={values.name}
                    onUpdate={updateValues}
                    skipValidation={!purchaseId && !isDirty}
                />
                <ItemsTable
                    items={values.items}
                    ocrTotal={krCents(values.amount)}
                    onItemQtyChange={onItemQtyChange}
                    onItemUpdate={onItemUpdate}
                    onNewItem={onItemAdd}
                    showValidationError={isDirty}
                />
                <div className={styles.editPurchaseCTA}>
                    <button
                        className={`ssb-btn primary-btn ${styles.saveButton}`}
                        disabled={!canSubmit}
                        onClick={savePurchase}
                    >
                        {(values && (values.status === PurchaseStatus.OCR_PENDING_USER_APPROVAL))
                            ? t('addPurchase.approveChanges')
                            : t('addPurchase.save')
                        }
                    </button>
                </div>
                {purchase &&
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
                }
            </div>
        </Workspace>
    ) : <Loader/>;
};

export default EditPurchase;
