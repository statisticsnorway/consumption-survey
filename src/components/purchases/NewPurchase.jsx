import { useState, useEffect, useContext, createRef } from 'react';
import { useRouter } from 'next/router';
import Autocomplete from 'react-autocomplete'
import { useTranslation } from 'react-i18next';
import { Edit3, PlusCircle, MinusCircle, Calendar } from 'react-feather';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import { Accordion } from '@statisticsnorway/ssb-component-library';
import { FireContext, UserContext } from '../../contexts';
import usePurchases from '../../hocs/usePurchases';
import { LayoutContext } from '../../uiContexts';
import TextField, { AdornmentPosition } from '../form/TextField';
import { FormInputViewMode } from '../form/inputConstants';

import styles from './purchases.module.scss';
import footerStyles from '../layout/styles/footer.module.scss';
import { SIMPLE_DATE_FORMAT, simpleFormat, parseDate } from '../../utils/dateUtils';
import useSearchTerms from '../../hocs/useSearchTerms';

const purchaseNameHints = [
    'Rema1000',
    'Baker Hansen',
    'Oslo City',
];

const NewPurchase = ({initialSearchTerms}) => {
    const router = useRouter();
    const dayPickerRef = createRef();
    const [dayPickerVisible, setDayPickerVisible] = useState(false);
    const {t} = useTranslation('purchases');
    const { searchTerms } = useSearchTerms();

    const [purchaseName, setPurchaseName] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(new Date());

    const [itemName, setItemName] = useState('');
    const [qty, setQty] = useState('');
    const [unit, setUnit] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [items, setItems] = useState([]);
    const {firestore} = useContext(FireContext);
    const {setFooterContent} = useContext(LayoutContext);
    const {addPurchase} = usePurchases();
    const [purchaseTotal, setPurchaseTotal] = useState(0);

    const onQtyChange = ({target}) => {
        setQty(target.value);
    };

    const onUnitPriceChange = ({target}) => {
        setUnitPrice(target.value);
    };

    const onPurchaseNameChange = ({target}) => {
        setPurchaseName(target.value);
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
        setQty('');
        setUnitPrice('');
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
            {idx: items.length, itemName, qty, unit, unitPrice}
        ]);

        setPurchaseTotal(purchaseTotal + Number(unitPrice));

        setItemName('');
        setQty('');
        setUnit('');
        setUnitPrice('');
    };

    const editItem = (item) => {

    };

    const removeItem = (item) => {
        const {idx, id} = item;
        if (id) {
            // this item is part of an already saved purchase
            setItems(items.filter(it => it.id !== id));
        } else {
            // this item has not yet been saved
            setItems([
                ...items.slice(9, idx),
                ...items.slice(idx + 1)
            ]);
        }
    };

    console.log('--> itemx', items);

    return (
        <>
            <Accordion header={t('addPurchase.nameDateGroupTitle')} className={styles.nameDateGroup}>
                <div className={styles.nameDateForm}>
                    <TextField
                        value={purchaseName}
                        placeholder={t('addPurchase.purchaseNamePlaceholder')}
                        className={styles.purchaseName}
                        onChange={(e) => {
                            setPurchaseName(e.target.value);
                        }}
                    />

                    <div className={styles.nameHints}>
                        {purchaseNameHints.map(hint => (
                            <a
                                className={styles.nameHint}
                                onClick={() => {
                                    setPurchaseName(hint);
                                }}
                            >
                                {hint}
                            </a>
                        ))}
                        <span className={styles.nameHintEtc}>osv..</span>
                    </div>

                    <div className={styles.purchaseDateGroup}>
                        <DayPickerInput
                            ref={dayPickerRef}
                            formatDate={simpleFormat}
                            format={SIMPLE_DATE_FORMAT}
                            parseDate={parseDate}
                            value={purchaseDate}
                            onDayChange={setPurchaseDate}
                            placeHolder={`${simpleFormat(purchaseDate)}`}
                        />
                        <Calendar onClick={toggleDayPicker} />
                    </div>
                </div>
            </Accordion>
            <div className={styles.lineItems}>
                {items.map((row, idx) => (
                    <div className={styles.lineItem}>
                        <div className={`${styles.lineItemField} ${styles.viewMode}`}>
                            {row.itemName}
                        </div>
                        <div className={`${styles.lineItemField} ${styles.viewMode}`}>
                            <TextField
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
                                value={row.unitPrice}
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
                    <div className={styles.lineItem}>
                        <div className={styles.lineItemField}>
                            <Autocomplete
                                inputProps={{placeholder: t('addPurchase.itemName.placeholder')}}
                                value={itemName}
                                className={styles.lineItemName}
                                wrapperStyle={{position: 'relative'}}
                                onChange={(e, value) => {
                                    setItemName(value);
                                }}
                                items={searchTerms}
                                renderMenu={(items, value, style) =>
                                    (items && (items.length > 0)) ? (
                                        <div className={styles.searchTerms} children={items}/>
                                    ) : (
                                        <></>
                                    )
                                }
                                shouldItemRender={(item, value) =>
                                    item.text.toLowerCase().indexOf(value.toLowerCase()) > -1
                                }
                                renderItem={(item, highlighted) => (
                                    <div>{item.text}</div>
                                )}
                                onSelect={(value, item) => {
                                    setItemName(value);
                                    setUnit(item.unit);
                                }}
                                getItemValue={(item) => {
                                    return item.text;
                                }}
                            />
                        </div>

                        <div className={styles.lineItemField}>
                            <TextField
                                adornment={unit}
                                adornmentPosition={AdornmentPosition.Suffix}
                                value={qty}
                                onChange={onQtyChange}
                                placeholder="1"
                                className={styles.lineItemQty}
                            />
                        </div>

                        <div className={styles.lineItemField}>
                            <TextField
                                adornment="kr."
                                adornmentPosition={AdornmentPosition.Suffix}
                                value={unitPrice}
                                onChange={onUnitPriceChange}
                                className={styles.lineItemPrice}
                                placeholder="0,00"
                            />
                        </div>
                        <div className={styles.lineItemField}></div>
                    </div>
                </div>
            </div>
            <a onClick={addItem} className={styles.addAnotherLink}>
                <span>Legge til ny vare</span>
                <PlusCircle/>
            </a>
        </>
    );
};

export default NewPurchase;
