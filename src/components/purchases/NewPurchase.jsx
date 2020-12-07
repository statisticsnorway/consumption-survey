import { useState, useEffect, useContext, createRef } from 'react';
import { useRouter } from 'next/router';
import { TextField as MaterialInput } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Edit3, PlusCircle, MinusCircle, Calendar } from 'react-feather';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Accordion } from '@statisticsnorway/ssb-component-library';
import usePurchases from '../../hocs/usePurchases';
import { LayoutContext } from '../../uiContexts';
import TextField, { AdornmentPosition } from '../form/TextField';
import { FormInputViewMode } from '../form/inputConstants';
import { SIMPLE_DATE_FORMAT, simpleFormat, parseDate, DASHBOARD_DATE_GROUPING_FORMAT } from '../../utils/dateUtils';
import workspaceStyles from '../layout/styles/workspace.module.scss';
import Modal from '../common/dialog/Modal';

import styles from './purchases.module.scss';
import footerStyles from '../layout/styles/footer.module.scss';
import ItemMask from '../form/ItemMask';
import PurchaseNameDateGroup from './PurchaseNameDateGroup';
import NewItem from './NewItem';

const purchaseNameHints = [
    'Kafé',
    'Restaurant',
    'Kiosk'
];

const NewPurchase = ({initialSearchTerms}) => {
    const router = useRouter();
    const dayPickerRef = createRef();
    const [dayPickerVisible, setDayPickerVisible] = useState(false);
    const {t} = useTranslation('purchases');

    const [purchaseName, setPurchaseName] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [nameDatePopupVisible, setNameDatePopupVisible] = useState(false);

    const showEditNameDatePopup = () => {
        setNameDatePopupVisible(true);
    };

    const [itemName, setItemName] = useState('');
    const [qty, setQty] = useState('1');
    const [unit, setUnit] = useState('1');
    const [price, setPrice] = useState('0,00');
    const [items, setItems] = useState([]);
    const {setFooterContent} = useContext(LayoutContext);
    const {addPurchase} = usePurchases();
    const [purchaseTotal, setPurchaseTotal] = useState(0);

    const onQtyChange = (value) => {
        setQty(value);
    };

    const onUnitPriceChange = (value) => {
        setPrice(value);
    };

    const onItemNameChange = (value) => {
        setItemName(value);
    };

    const onPurchaseNameChange = (value) => {
        setPurchaseName(value);
    };

    const toggleDayPicker = () => {
        const dayPickerComp = dayPickerRef.current;
        if (!dayPickerComp) {
            console.log('XXXXX daypicker comp ref not initialized correctly');
        } else {
            dayPickerVisible ? dayPickerComp.hideDayPicker() : dayPickerComp.showDayPicker();
            setDayPickerVisible(!dayPickerVisible);
        }
    };


    const clearItemInfo = () => {
        setItemName('');
        setQty('1');
        setPrice('0,00');
    };

    const clearItems = () => {
        setItems([]);
    };

    const clearAll = () => {
        clearItemInfo();
        clearItems();
    };

    const savePurchase = (e) => {
        e.preventDefault();

        const doc = {
            where: purchaseName,
            when: purchaseDate || new Date(),
            totalPrice: purchaseTotal,
            items,
        };

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

    const addPurchaseFooter = (
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
        setFooterContent(addPurchaseFooter);
    }, [purchaseTotal]);

    const addItem = (e) => {
        e.preventDefault();
        setItems([
            ...items,
            {idx: items.length, itemName, qty, units: unit, price},
        ]);

        const [priceVal, suffix] = price.split(' kr.');
        setPurchaseTotal(purchaseTotal + (Number(priceVal) || 0));

        setItemName('');
        setQty('1');
        setUnit('stk');
        setPrice('0,00');
    };

    const editItem = (item) => {

    };

    const removeItem = (item) => {
        const {idx, id} = item;
        setItems(items.filter(it =>
            it.id ? (it.id !== id) : (it.idx !== idx)));

        setPurchaseTotal(purchaseTotal - (Number(item.price) || 0));
    };

    console.log('--> itemx', items);
    const acc = (
        <Accordion header={t('addPurchase.nameDateGroupTitle')} className={styles.nameDateGroup}>
        </Accordion>
    );

    const inlineDlg = (
        <Modal
            show={nameDatePopupVisible}
            closeText="Lagre"
            className={styles.addPurchase}
            onClose={() => {
                setNameDatePopupVisible(false);
            }}
            onCancel={() => {
                setNameDatePopupVisible(false);
            }}
            cancelText="Avbryt"
        >
            <h2>{t('addPurchase.title')}</h2>
            <div className={styles.nameDateGroup}>
                <div className={styles.nameDateForm}>
                    <MaterialInput
                        value={purchaseName}
                        placeholder={t('addPurchase.purchaseNamePlaceholder')}
                        onChange={(e) => { setPurchaseName(e.target.value); }}
                        label={t('addPurchase.name.label')}
                        className={styles.purchaseName}
                    />
                    <TextField
                        id="purchaseName"
                        label={t('addPurchase.name.label')}
                        value={purchaseName}
                        placeholder={t('addPurchase.purchaseNamePlaceholder')}
                        className={styles.purchaseName}
                        onChange={(newVal) => {
                            setPurchaseName(newVal);
                        }}
                        hints={purchaseNameHints}
                    />

                    <div className={styles.purchaseDateGroup}>
                        <DayPickerInput
                            ref={dayPickerRef}
                            formatDate={simpleFormat}
                            format={SIMPLE_DATE_FORMAT}
                            parseDate={parseDate}
                            value={purchaseDate}
                            onDayChange={setPurchaseDate}
                            placeholder={`${simpleFormat(purchaseDate)}`}
                            keepFocus={false}
                        />
                        <div className={styles.purchaseDateIconWrapper}>
                            <Calendar onClick={toggleDayPicker} className={styles.purchaseDateIcon}/>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );

    const setValues = (name, date) => {
        setPurchaseName(name);
        setPurchaseDate(date);
        setNameDatePopupVisible(false);
    };

    const all = (
        <div className={styles.addPurchase}>
            <span>{t('addPurchase.lineItems.title')}</span>
            <div className={styles.lineItems}>
                {items.map((row, idx) => (
                    <div className={styles.lineItem}>
                        <div className={`${styles.lineItemField} ${styles.viewMode}`}>
                            {row.itemName}
                        </div>
                        <div className={`${styles.lineItemField} ${styles.viewMode}`}>
                            <TextField
                                id="purchaseQty"
                                value={row.qty}
                                adornment={row.unit}
                                adornmentPosition={AdornmentPosition.Suffix}
                                className={styles.lineItemQtyView}
                                viewMode={FormInputViewMode.VIEW}
                                style={{textAlign: 'right'}}
                            />
                        </div>
                        <div className={`${styles.lineItemField} ${styles.viewMode}`}>
                            <TextField
                                id="purchaseUnitPrice"
                                value={row.price}
                                adornment="kr."
                                adornmentPosition={AdornmentPosition.Suffix}
                                className={styles.lineItemPriceView}
                                style={{textAlign: 'right'}}
                                viewMode={FormInputViewMode.VIEW}
                            />
                        </div>
                        <div className={`${styles.lineItemField} ${styles.editLineItem}`}>
                            <Edit3
                                onClick={() => {
                                    console.log('will remove', row);
                                    editItem(row);
                                }}
                                style={{width: '1rem', height: '1rem'}}
                            />
                        </div>
                        <div className={`${styles.lineItemField} ${styles.deleteLineItem}`}>
                            <MinusCircle
                                onClick={() => {
                                    console.log('will remove', row);
                                    removeItem(row);
                                }}
                                style={{width: '1rem', height: '1rem'}}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.addPurchaseFormWrapper}>
                <div className={styles.addPurchaseForm}>
                    <ItemMask
                        name={itemName}
                        qty={qty}
                        price={price}
                        units={unit}
                        onNameChange={onItemNameChange}
                        onQtyChange={onQtyChange}
                        onUnitsChange={(newVal) => {
                            setUnit(newVal);
                        }}
                        onPriceChange={onUnitPriceChange}
                        onComplete={addItem}
                        clear={clearItemInfo}
                    />
                </div>
            </div>
            <a onClick={addItem} className={styles.addAnotherLink}>
                <span>Legge til ny vare</span>
                <PlusCircle/>
            </a>
        </div>
    );

    return (
        <>
            <PurchaseNameDateGroup
                show={nameDatePopupVisible}
                currName={t('addPurchase.purchaseNameDefault')}
                currDate={new Date()}
                onSubmit={setValues}
                onCancel={() => { setNameDatePopupVisible(false); }}
            />
            <div className={workspaceStyles.pageHeader}>
                <div className={workspaceStyles.leftSection}>
                    <h1>{purchaseName || t('addPurchase.title')}</h1>
                    <div className={styles.editMetaLink}>
                        <a onClick={() => {
                            showEditNameDatePopup();
                        }}>{simpleFormat(purchaseDate)}</a>
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
            <NewItem />
        </>
    );
};

export default NewPurchase;
