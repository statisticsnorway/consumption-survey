import { useState, useEffect, useContext, createRef, useRef, createContext } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Edit3, PlusCircle } from 'react-feather';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Accordion } from '@statisticsnorway/ssb-component-library';
import usePurchases from '../../hocs/usePurchases';
import { LayoutContext } from '../../uiContexts';
import workspaceStyles from '../layout/styles/workspace.module.scss';
import PurchaseNameDateGroup from './PurchaseNameDateGroup';
import NewItem from './NewItem';
import ItemsTable from './ItemsTable';
import { simpleFormat } from '../../utils/dateUtils';

import styles from './purchases.module.scss';
import footerStyles from '../layout/styles/footer.module.scss';

const purchaseNameHints = [
    'Kafé',
    'Restaurant',
    'Kiosk'
];

type NewPurchasesContextType = {
    showNewPurchaseHeader: boolean,
    setShowNewPurchaseHeader: (boolean) => void;
};

export const NewPurchasesContext = createContext({} as NewPurchasesContextType);

const NewPurchase = ({initialSearchTerms}) => {
    const router = useRouter();
    const [showNewPurchaseHeader, setShowNewPurchaseHeader] = useState(true);
    const {t} = useTranslation('purchases');
    const [nameDatePopupVisible, setNameDatePopupVisible] = useState(false);
    const [showNewItemForm, setShowNewItemForm] = useState(true);
    const [purchaseName, setPurchaseName] = useState<string>(t('addPurchase.title'));
    const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());

    const showEditNameDatePopup = () => {
        setNameDatePopupVisible(true);
    };

    const [items, setItems] = useState([]);
    const {showFooter, setShowFooter, setFooterContent} = useContext(LayoutContext);
    const {addPurchase} = usePurchases();
    const [purchaseTotal, setPurchaseTotal] = useState(0);

    const clearItems = () => {
        setItems([]);
    };

    const clearAll = () => {
        clearItems();
    };

    const savePurchase = (e) => {
        e.preventDefault();

        const doc = {
            where: purchaseName,
            when: purchaseDate,
            totalPrice: purchaseTotal,
            items,
        };

        console.log('saving', doc);

        addPurchase(doc)
            .then((res) => {
                console.log('item added', res);
                router.push('/dashboard/Dashboard');
            });

        clearAll();
    };

    const cancelPurchase = () => {
        setFooterContent(null);
        clearAll();
    };

    const addPurchaseFooter = () => (
        <div className={footerStyles.footerWrapper}>
            <div className={styles.addPurchaseFooterTotal}>
                <span className={styles.addPurchaseFooterTotalText}>{t('addPurchase.total')}</span>
                <span className={styles.addPurchaseFooterTotalSum}>{purchaseTotal}</span>
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
    );

    useEffect(() => {
        if (showFooter) {
            setFooterContent(addPurchaseFooter());
        } else {
            setFooterContent(null);
        }
    }, [showFooter, purchaseTotal]);

    const addItem = ({name, qty, units, kr, cents}) => {
        setItems([
            ...items,
            {idx: items.length, name, qty, units, kr, cents}
        ]);

        setPurchaseTotal(purchaseTotal + (Number(`${kr}.${cents}`) || 0));
        setShowNewItemForm(false);
        if (!showFooter) {
            setShowFooter(true);
        }
    };

    const removeItem = (item) => {
        const {idx, id} = item;
        setItems(items.filter(it =>
            it.id ? (it.id !== id) : (it.idx !== idx)));

        setPurchaseTotal(purchaseTotal - (Number(`${item.kr}.${item.cents}`) || 0));
    };

    const onCancelAddItem = () => {
        setShowNewItemForm(false);
    };

    return (
        <NewPurchasesContext.Provider value={{
            showNewPurchaseHeader,
            setShowNewPurchaseHeader,
        }}>
            {showNewPurchaseHeader &&
            <>
                <PurchaseNameDateGroup
                    show={nameDatePopupVisible}
                    onSubmit={(name, date) => {
                        console.log('saving', name, date);
                        setPurchaseDate(date);
                        setPurchaseName(name);
                        setNameDatePopupVisible(false);
                    }}
                    onCancel={() => {
                        setNameDatePopupVisible(false);
                    }}
                />
                <div className={workspaceStyles.pageHeader}>
                    <div className={workspaceStyles.leftSection}>
                        <h1>{purchaseName || t('addPurchase.title')}</h1>
                        <div className={styles.editMetaLink}>
                            <a onClick={() => {
                                showEditNameDatePopup();
                            }}>{simpleFormat(purchaseDate || new Date())}</a>
                        </div>
                    </div>
                    <div className={workspaceStyles.rightSection}>
                        <Edit3
                            onClick={() => {
                                showEditNameDatePopup();
                            }}
                            className={styles.editMetaLink}
                        />
                    </div>
                </div>
            </>
            }
            <div className={styles.addPurchase}>
                <ItemsTable
                    items={items}
                    onItemRemove={(item) => {
                        console.log('will remove ', item);
                        removeItem(item);
                    }}
                />
                <NewItem
                    show={showNewItemForm}
                    onAddItem={addItem}
                    onCancel={onCancelAddItem}
                />
                <a
                    className={styles.addAnotherLink}
                    onClick={() => {
                        setShowNewItemForm(true);
                    }}
                >
                    <span>{t('addPurchase.addAnotherItem')}</span>
                    <PlusCircle width={16} height={16}/>
                </a>
            </div>
        </NewPurchasesContext.Provider>
    );
};

export default NewPurchase;
