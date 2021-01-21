import { ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit3, PlusCircle, ArrowLeft } from 'react-feather';
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

export type EditPurchaseProps = {
    purchaseId: string;
    onDate: string;
};

const EditPurchase = ({purchaseId, onDate}: EditPurchaseProps) => {
    const {purchases, editPurchase, addPurchase, deletePurchase} = usePurchases();
    const [purchase, setPurchase] = useState<PurchaseType>(null);
    const [values, setValues] = useState<PurchaseType>();
    const [itemForEdit, setItemForEdit] = useState<ItemType>(null);

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
                    when: onDate ? parseDate(onDate).toISOString() : INIT_PURCHASE.when,
                });
            }
        }
    }, [purchases]);

    useEffect(() => {
        if (purchase) {
            setValues(purchase);
        }
    }, [purchase]);

    const updateValue = key => (e) => {
        setValues({
            ...values,
            [key]: e.target.value
        });
    };

    const saveChanges = (e) => {
        e.preventDefault();

        editPurchase(purchaseId, values)
            .then((res) => {
                console.log('purchase updated', res);
            });
    };

    const onCancelAddItem = () => {
        setShowAddItemForm(false);
    };

    const updateNameAndDate = (name, date) => {
        setValues({
            ...values,
            where: name,
            when: date,
        });
    };

    const addItem = ({id, idx, name, qty, units, amount}) => {
        const {items, totalPrice} = values;

        setValues({
            ...values,
            items: [
                ...items,
                {idx: items.length, name, qty, units, amount},
            ],
            totalPrice: (totalPrice + (Number(amount) * Number(qty))),
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
            totalPrice: values.totalPrice
                - (Number(oldItem.amount) * Number(oldItem.qty))
                + (Number(amount) * Number(qty)),
        });

        setShowEditItemForm(false);
    };

    const removeItem = (item) => {
        const {idx, id} = item;
        const {items, totalPrice} = values;
        setValues({
            ...values,
            items: items.filter(it =>
                it.id ? (it.id !== id) : (it.idx !== idx)),
            totalPrice: (totalPrice - (Number(item.amount) * Number(item.qty))),
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

        const complete = {...values, when, where};

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
        if (!values.where) {
            setIsSaving(true)
            setNameDatePopupVisible(true);
        } else {
            doSave(values.where, values.when);
        }
    };

    useEffect(() => {
        if (values && Array.isArray(values.items)) {
            const nrItems = values.items.length;

            const btnText = nrItems === 0 ? '' : `(${nrItems} vare${nrItems > 1 ? 'r' : ''})`;
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
                            disabled={nrItems === 0}
                        >
                            {t('addPurchase.save')} {btnText}
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

    return values ? (
        <>
            <PurchaseNameDateGroup
                currName={values.where}
                currDate={new Date(values.when)}
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
                    <h1>{values.where || t('addPurchase.title')}</h1>
                    <div className={styles.editMetaLink}>
                        <a
                            onClick={() => {
                                showEditNameDatePopup();
                            }}
                        >
                            {simpleFormat(values.when ? new Date(values.when) : new Date())}
                        </a>
                    </div>
                </div>
                <div className={workspaceStyles.rightSection}>
                    <Edit3
                        className={styles.editMetaLink}
                        onClick={() => {
                            showEditNameDatePopup();
                        }}
                    />
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

                            const totalPrice = itemsUpd.reduce((acc, item) =>
                                acc + (Number(item.amount) * Number(item.qty)), 0);

                            setValues({
                                ...values,
                                items: itemsUpd,
                                totalPrice,
                            });
                        }
                    }}
                    onItemClick={(item) => {
                        setItemForEdit(item);
                        setShowEditItemForm(true);
                    }}
                />
                <div className={styles.deletePurchaseContainer}>
                    <button
                        className={`ssb-btn secondary-btn ${styles.deletePurchase}`}
                        onClick={() => {
                            setShowPurchaseDeleteConfirm(true);
                        }}
                    >
                        {t('deletePurchase.title')}
                    </button>
                </div>
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
            </div>
        </>
    ) : null;
};

export default EditPurchase;
