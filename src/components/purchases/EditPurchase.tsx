import { ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit3, PlusCircle, ArrowLeft, Trash2 } from 'react-feather';
import { INIT_PURCHASE, ItemType, PurchaseType } from '../../firebase/model/Purchase';
// import usePurchases from '../../hocs/usePurchases';
import usePurchases from '../../mock/usePurchases';
import { parseDate, simpleFormat } from '../../utils/dateUtils';
import ItemsTable from './ItemsTable';
import EditItem from './EditItem';
import PurchaseNameDateGroup from './PurchaseNameDateGroup';
import { useRouter } from 'next/router';
import { LayoutContext } from '../../uiContexts';
import DeleteItemDialog from './support/DeleteItemDialog';
import DeletePurchaseDialog from './support/DeletePurchaseDialog';
import { PATHS } from '../../uiConfig';

import styles from './purchases.module.scss';
import headerStyles from '../layout/styles/header.module.scss';
import workspaceStyles from '../layout/styles/workspace.module.scss';
import ActionsPopup from '../common/dialog/ActionsPopup';

export type EditPurchaseProps = {
    purchaseId: string;
    onDate: string;
};

const EditPurchase = ({purchaseId, onDate}: EditPurchaseProps) => {
    const {purchases, editPurchase, addPurchase, deletePurchase} = usePurchases();
    const [purchase, setPurchase] = useState<PurchaseType>(null);
    const [values, setValues] = useState<PurchaseType>();
    const [itemForEdit, setItemForEdit] = useState<ItemType>(null);
    const [isDirty, setIsDirty] = useState<boolean>();
    const [init, setInit] = useState<boolean>(true);

    const [showPurchaseDeleteConfirm, setShowPurchaseDeleteConfirm] = useState<boolean>();

    const {setHeaderContent} = useContext(LayoutContext);
    const [editPurchaseHeader, setEditPurchaseHeader] = useState<ReactNode>();

    const {t} = useTranslation('purchases');
    const router = useRouter();

    const [nameDatePopupVisible, setNameDatePopupVisible] = useState(false);
    const [showEditItemForm, setShowEditItemForm] = useState(false);
    const [showAddItemForm, setShowAddItemForm] = useState(purchaseId ? false : true);

    const [error, setError] = useState<string>();

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (purchases) {
            if (purchaseId) {
                const match = purchases.find(p => {
                    console.log(p.id, ' =? ', purchaseId);
                    return p.id === purchaseId;
                });
                console.log(purchases);
                console.log(match);
                if (!match) {
                    setError(`${t('error.purchaseNotFound')} ${purchaseId}`);
                } else {
                    setPurchase(match);
                }
            } else {
                setPurchase({
                    ...INIT_PURCHASE,
                    purchaseDate: onDate ? parseDate(onDate).toISOString() : INIT_PURCHASE.purchaseDate,
                });
            }
        }
    }, [purchases]);

    useEffect(() => {
        if (purchase) {
            setValues(purchase);
            setInit(false);
        }
    }, [purchase]);

    const onCancelAddItem = () => {
        setShowAddItemForm(false);
    };

    const updateNameAndDate = (name, date) => {
        setValues({
            ...values,
            name,
            purchaseDate: date,
        });
    };

    const addItem = ({id, idx, name, qty, units, amount}) => {
        const {items} = values;

        setValues({
            ...values,
            items: [
                ...items,
                {idx: items.length, name, qty, units, amount},
            ],
            amount: (values.amount + (Number(amount) * Number(qty))),
        });

        setShowAddItemForm(false);
    };

    const updateItem = ({idx, name, qty, units, amount}) => {
        console.log('updating', idx, name, qty);
        const {items} = values;
        const oldItem = items.find(item => (item.idx === idx));
        const other = items.filter(item => (item.idx !== idx));

        setValues({
            ...values,
            items: [
                ...other,
                {
                    idx,
                    name,
                    qty,
                    units,
                    amount,
                }
            ],
            amount: values.amount
                - (Number(oldItem.amount) * Number(oldItem.qty))
                + (Number(amount) * Number(qty)),
        });

        setShowEditItemForm(false);
    };

    const removeItem = (item) => {
        const {idx, id} = item;
        const {items, amount} = values;
        setValues({
            ...values,
            items: items.filter(it =>
                it.id ? (it.id !== id) : (it.idx !== idx)),
            amount: (amount - (Number(item.amount) * Number(item.qty))),
        });
    };

    const onCancelEditItem = () => {
        setShowEditItemForm(false);
    };

    const showEditNameDatePopup = () => {
        setNameDatePopupVisible(true);
    };

    const clearAll = () => {
        setValues(null);
    };

    const cleanup = () => {
        setHeaderContent(null);
        clearAll();
    };

    const onSuccessfulEdit = () => {
        cleanup();
        router.push(`/dashboard/Dashboard`);
    };

    const doSave = (where, when) => {
        console.log('saving', values);

        const complete = {...values, purchaseDate: when, name: where};

        if (purchaseId) {
            editPurchase(purchaseId, complete)
                .then((res) => {
                    console.log('purchase updated', res);
                    onSuccessfulEdit();
                });
        } else {
            addPurchase(complete)
                .then((res) => {
                    console.log('item added', res);
                    onSuccessfulEdit();
                });
        }
    };

    const savePurchase = () => {
        if (!values.name) {
            setIsSaving(true)
            setNameDatePopupVisible(true);
        } else {
            doSave(values.name, values.purchaseDate);
        }
    };

    useEffect(() => {
        if (values && Array.isArray(values.items)) {
            if (!init) {
                setIsDirty(true);
            }

            const nrItems = values.items.length;

            const disabled = (nrItems === 0) || (purchaseId && !isDirty);

            setEditPurchaseHeader(
                <div className={headerStyles.headerComponentWrapper}>
                    <div className={headerStyles.leftSection}>
                        <a
                            className={headerStyles.actionLink}
                            onClick={() => {
                                cleanup();
                                router.back();
                            }}
                        >
                            <ArrowLeft width={16} height={16} className={headerStyles.actionIcon}/>
                            <span className={styles.linkText}>{t('back')}</span>
                        </a>
                    </div>
                    <div className={headerStyles.rightSection}>
                        <button
                            className={`ssb-btn primary-btn ${styles.addPurchaseSave}`}
                            onClick={(e) => {
                                e.preventDefault();
                                savePurchase();
                            }}
                            disabled={disabled}
                        >
                            {t('addPurchase.save')}
                        </button>
                    </div>
                </div>
            );
        } else {
            setEditPurchaseHeader(null);
        }
    }, [values]);

    useEffect(() => {
        setHeaderContent(editPurchaseHeader);
    }, [editPurchaseHeader]);

    const clearPurchaseDelete = () => {
        setShowPurchaseDeleteConfirm(false);
    };

    if (error) {
        return (
            <div className={workspaceStyles.error}>
                {error}
            </div>
        );
    }

    const editMeta = () => (
        <div className={styles.editMetaLink}>
            <a
                onClick={() => {
                    showEditNameDatePopup();
                }}
            >
                {simpleFormat(values.purchaseDate ? new Date(values.purchaseDate) : new Date())}
            </a>
        </div>
    );

    return values ? (
        <>
            <PurchaseNameDateGroup
                currName={values.name}
                currDate={new Date(values.purchaseDate)}
                show={nameDatePopupVisible}
                onSubmit={(name, date) => {
                    console.log('saving', name, date);

                    if (isSaving) {
                        console.log('Should save purchase too', isSaving);
                        setIsSaving(false);
                        doSave(name, date);
                    } else {
                        updateNameAndDate(name, date);
                        setNameDatePopupVisible(false);
                    }
                }}
                onCancel={() => {
                    setNameDatePopupVisible(false);
                }}
            />
            <div className={workspaceStyles.pageHeader}>
                <div className={workspaceStyles.leftSection}>
                    <h1>{values.name || t('addPurchase.title')}</h1>
                    <div className={styles.purchaseDate}>
                        {simpleFormat(values.purchaseDate ? new Date(values.purchaseDate) : new Date())}
                    </div>
                </div>
                <div className={workspaceStyles.rightSection}>
                    <Edit3
                        className={`${styles.editMetaIcon} ${styles.editPurchaseIcon}`}
                        onClick={() => {
                            showEditNameDatePopup();
                        }}
                    />
                    {purchaseId &&
                    <Trash2
                        className={`${styles.editMetaIcon} ${styles.deletePurchaseIcon}`}
                        onClick={() => {
                            setShowPurchaseDeleteConfirm(true);
                        }}
                    />
                    }
                </div>
            </div>

            <div className={styles.addPurchase}>
                <a
                    className={styles.addAnotherLink}
                    onClick={() => {
                        setShowAddItemForm(true);
                    }}
                >
                    <PlusCircle width={16} height={16}/>
                    <span>{t('addPurchase.addAnotherItem')}</span>
                </a>
                <ItemsTable
                    items={values.items}
                    onItemUpdate={(item, newQty) => {
                        if (newQty === 0) {
                            console.log('item will be removed');
                            removeItem(item);
                        } else {
                            const itemsUpd = values.items.map(i => {
                                const match = (x) =>
                                    x.id ? x.id === item.id : x.idx === item.idx;

                                return match(i) ? {...i, qty: `${newQty}`} : i;
                            });

                            const amount = itemsUpd.reduce((acc, item) =>
                                acc + (Number(item.amount) * Number(item.qty)), 0);

                            setValues({
                                ...values,
                                items: itemsUpd,
                                amount,
                            });
                        }
                    }}
                    onItemClick={(item) => {
                        setItemForEdit(item);
                        setShowEditItemForm(true);
                    }}
                />
                <EditItem
                    itemInfo={null}
                    show={showAddItemForm}
                    onAddItem={addItem}
                    onCancel={onCancelAddItem}
                />
                <EditItem
                    itemInfo={itemForEdit}
                    show={showEditItemForm}
                    onAddItem={updateItem}
                    onCancel={onCancelEditItem}
                />
                {purchaseId &&
                <DeletePurchaseDialog
                    purchase={purchase}
                    show={showPurchaseDeleteConfirm}
                    onConfirm={() => {
                        deletePurchase(purchase)
                            .then(res => {
                                console.log('Purchase deleted', purchase);
                                clearPurchaseDelete();
                                router.push(PATHS.DASHBOARD);
                            });
                    }}
                    onCancel={clearPurchaseDelete}
                />
                }
            </div>
        </>
    ) : null;
};

export default EditPurchase;
