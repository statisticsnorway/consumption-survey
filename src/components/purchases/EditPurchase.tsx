import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit3, PlusCircle } from 'react-feather';
import { INIT_PURCHASE, ItemType, PurchaseType } from '../../firebase/model/Purchase';
// import usePurchases from '../../hocs/usePurchases';
import usePurchases from '../../mock/usePurchases';
import { simpleFormat } from '../../utils/dateUtils';
import ItemsTable from './ItemsTable';
import NewItem, { NewItemInfo } from './NewItem';
import PurchaseNameDateGroup from './PurchaseNameDateGroup';
import { useRouter } from 'next/router';
import { krCents } from '../../utils/jsUtils';

import styles from './purchases.module.scss';
import footerStyles from '../layout/styles/footer.module.scss';
import workspaceStyles from '../layout/styles/workspace.module.scss';

export type EditPurchaseProps = {
    purchaseId: string;
};

const EditPurchase = ({purchaseId}: EditPurchaseProps) => {
    const {purchases, editPurchase, addPurchase} = usePurchases();
    const [purchase, setPurchase] = useState<PurchaseType>(null);
    const [values, setValues] = useState<PurchaseType>();
    const [itemForEdit, setItemForEdit] = useState<NewItemInfo>(null);

    const {t} = useTranslation('purchases');
    const router = useRouter();

    const [nameDatePopupVisible, setNameDatePopupVisible] = useState(false);
    const [showEditItemForm, setShowEditItemForm] = useState(false);
    const [showAddItemForm, setShowAddItemForm] = useState(true);

    useEffect(() => {
        if (purchases) {
            if (purchaseId) {
                setPurchase(purchases.find(p => p.id === purchaseId));
            } else {
                setPurchase(INIT_PURCHASE)
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

    const cancelEditPurchase = () => {
        // navigate to dashboard;
    };

    const onCancelAddItem = () => {
        setShowAddItemForm(false);
    };

    const editPurchaseFooter = values ? (
        <div className={footerStyles.footerWrapper}>
            <div className={styles.addPurchaseFooterTotal}>
                <span className={styles.addPurchaseFooterTotalText}>{t('addPurchase.total')}</span>
                <span className={styles.addPurchaseFooterTotalSum}>{values.totalPrice}</span>
            </div>
            <div className={styles.addPurchaseFooter}>
                <button
                    className={`ssb-btn secondary-btn ${styles.addPurchaseCancel}`}
                    onClick={cancelEditPurchase}
                >
                    {t('addPurchase.cancel')}
                </button>
                <button
                    className={`ssb-btn primary-btn ${styles.addPurchaseSave}`}
                    onClick={saveChanges}
                >
                    {t('addPurchase.save')}
                </button>
            </div>
        </div>
    ) : null;

    const updateNameAndDate = (name, date) => {
        setValues({
            ...values,
            where: name,
            when: date,
        });
    };

    const addItem = ({id, idx, name, qty, units, kr, cents}) => {
        const {items, totalPrice} = values;

        setValues({
            ...values,
            items: [
                ...items,
                {idx: items.length, name, qty, units, kr, cents},
            ],
            totalPrice: (totalPrice + (Number(`${kr}.${cents}`))),
        });

        setShowAddItemForm(false);
    };

    const updateItem = ({idx, name, qty, units, kr, cents}) => {
        console.log('updating', idx, name, qty);
        const {items} = values;
        const changed = items.find(item => (item.idx === idx));
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
                    kr,
                    cents
                }
            ],
            totalPrice: values.totalPrice
                - Number(`${changed.kr}.${changed.cents}`)
                + Number(`${kr}.${cents}`),
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
            totalPrice: (totalPrice - Number(`${item.kr}.${item.cents}`)),
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

    const cancelPurchase = () => {
        clearAll();
        router.push(`/dashboard/Dashboard`);
    };

    const savePurchase = (e) => {
        e.preventDefault();

        console.log('saving', values);

        if (purchaseId) {
            editPurchase(purchaseId, values)
                .then((res) => {
                    console.log('purchase updated', res);
                    router.push(`/dashboard/Dashboard`);
                });
        } else {
            addPurchase(values)
                .then((res) => {
                    console.log('item added', res);
                    router.push('/dashboard/Dashboard');
                });
        }

        clearAll();
    };

    const addPurchaseFooter = values ? (
        <div className={footerStyles.footerWrapper}>
            <div className={styles.addPurchaseFooterTotal}>
                <span className={styles.addPurchaseFooterTotalText}>{t('addPurchase.total')}</span>
                <span className={styles.addPurchaseFooterTotalSum}>{krCents(Number(values.totalPrice || 0))}</span>
            </div>
            <div className={styles.addPurchaseFooter}>
                <button
                    className={`ssb-btn secondary-btn ${styles.addPurchaseCancel}`}
                    onClick={cancelPurchase}
                >
                    {t('addPurchase.cancel')}
                </button>
                <button
                    className={`ssb-btn primary-btn ${styles.addPurchaseSave}`}
                    onClick={savePurchase}
                >
                    {t('addPurchase.save')}
                </button>
            </div>
        </div>
    ) : null;

    return values ? (
        <>
            <PurchaseNameDateGroup
                currName={values.where}
                currDate={new Date(values.when)}
                show={nameDatePopupVisible}
                onSubmit={(name, date) => {
                    console.log('saving', name, date);
                    updateNameAndDate(name, date);
                    setNameDatePopupVisible(false);
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
                            onClick={() => { showEditNameDatePopup(); }}
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
                <ItemsTable
                    items={values.items}
                    onItemRemove={(item) => {
                        console.log('will remove', item);
                        removeItem(item);
                    }}
                    onItemClick={(item) => {
                        setItemForEdit(item);
                        setShowEditItemForm(true);
                    }}
                />
                <NewItem
                    itemInfo={null}
                    show={showAddItemForm}
                    onAddItem={addItem}
                    onCancel={onCancelAddItem}
                />
                <NewItem
                    itemInfo={itemForEdit}
                    show={showEditItemForm}
                    onAddItem={updateItem}
                    onCancel={onCancelEditItem}
                />
                <a
                    className={styles.addAnotherLink}
                    onClick={() => {
                        setShowAddItemForm(true);
                    }}
                >
                    <span>{t('addPurchase.addAnotherItem')}</span>
                    <PlusCircle width={16} height={16}/>
                </a>
            </div>
            {addPurchaseFooter}
        </>
    ) : null;
};

export default EditPurchase;
