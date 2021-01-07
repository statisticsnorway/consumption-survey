import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
// import useSearchTerms from '../../hocs/useSearchTerms';
import useSearchTerms from '../../mock/useSesarchTerms';
import Modal from '../common/dialog/Modal';
import { SearchTermType } from '../../firebase/model/SearchTerm';

import formStyles from '../form/form.module.scss';
import styles from './styles/addPurchase.module.scss';
import NumberFormat from 'react-number-format';

type SearchTermExt = SearchTermType & { inputValue?: string };

const filter = createFilterOptions<SearchTermExt>();

export type ItemInfo = {
    idx: number;
    name: string;
    qty: string;
    units: string;
    kr: string;
    cents: string;
    krCents?: string;
    code?: string;
    searchTermId?: number;
};

const INIT_STATE: ItemInfo = {
    idx: -1,
    name: '',
    qty: '1',
    units: 'stk',
    kr: '0',
    cents: '00',
    code: undefined,
    searchTermId: undefined,
};

export type EditItemProps = {
    itemInfo?: ItemInfo;
    show: boolean;
    onAddItem: (item: ItemInfo) => void;
    onCancel: () => void;
};

interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            type="tel"
        />
    );
}

const EditItem = ({itemInfo, show, onAddItem, onCancel}: EditItemProps) => {
    const {t} = useTranslation('purchases');
    const formRef = useRef(null);
    const [values, setValues] = useState<ItemInfo>(INIT_STATE);
    const nameFieldRef = useRef(null);
    const krFieldRef = useRef(null);
    const centsFieldRef = useRef(null);
    const krCentsFieldRef = useRef(null);

    const [showPopup, setShowPopup] = useState(show);
    const {searchTerms} = useSearchTerms();

    useEffect(() => {
        if (itemInfo) {
            setValues(itemInfo);
        }
    }, [itemInfo]);

    useEffect(() => {
        setShowPopup(show);
    }, [show]);


    useEffect(() => {
        if (showPopup) {
            nameFieldRef.current.focus();
        }
    }, [showPopup]);

    const updateValue = (val: keyof ItemInfo) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [val]: e.target.value,
        });
    };

    const extractValFromAutoComplete = (evt, newValue) => {
        console.log('selected', newValue, 'target', evt.target.value);
        if (!newValue) {
            return {};
        }
        if (typeof newValue === 'string') {
            return {name: newValue};
        } else if (newValue && newValue.inputValue) {
            return {name: newValue.inputValue};
        }

        const {id, text, code, units} = newValue;
        return {
            searchTermId: id,
            name: text,
            code,
            units: units || values.units,
        };
    };

    const qtyField = (
        <TextField
            placeholder={t('addPurchase.newItem.qty.placeholder')}
            id="newItem-qty"
            value={values.qty}
            required
            onChange={updateValue('qty')}
            aria-described-by="qty-helper-text"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">stk</InputAdornment>
                )
            }}
            className={`${formStyles.fbuFormField} ${styles.itemQty}`}
        />
    );

    return (
        <Modal
            show={showPopup}
            title={t('addPurchase.newItem.title')}
            onClose={() => {
                console.log('Verifying', values);
                if (values.name
                    && (Number(values.qty) !== NaN) && (Number(values.qty) >= 1)
                    && (Number(values.kr) !== NaN) && (Number(values.kr) >= 0)
                    && (values.cents ? Number(values.cents) !== NaN : true)) {
                    onAddItem(values);
                    setShowPopup(false);
                    setValues(INIT_STATE);
                }
            }}
            closeText={t('addPurchase.save')}
            onCancel={() => {
                setShowPopup(false);
                onCancel();
            }}
            cancelText={t('addPurchase.cancel')}
        >
            <div
                ref={(el) => {
                    formRef.current = el;
                }}
                className={`${formStyles.fbuForm} ${styles.newItemForm}`}
            >
                <div className={`${formStyles.fbuFormGroup} ${styles.itemNamePriceGroup}`}>
                    <Autocomplete
                        inputValue={values.name}
                        options={searchTerms as SearchTermExt[]}
                        renderOption={(option: SearchTermExt) => option.text}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    inputRef={nameFieldRef}
                                    placeholder={t('addPurchase.newItem.name.placeholder')}
                                    required
                                    value={values.name}
                                    onChange={updateValue('name')}
                                    {...params}
                                    className={`${formStyles.fbuFormField} ${styles.itemName}`}
                                />
                            );
                        }
                        }
                        onChange={(evt, newValue) => {
                            setValues({
                                ...values,
                                ...extractValFromAutoComplete(evt, newValue),
                            });

                            krCentsFieldRef.current.focus();
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params) as SearchTermExt[];

                            if (params.inputValue !== '') {
                                filtered.push({
                                    inputValue: params.inputValue,
                                    text: `${t('addPurchase.newItem.addNewTerm')} "${params.inputValue}"`,
                                    id: null,
                                    code: null,
                                });
                            }

                            return filtered;
                        }}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            } else if (option.inputValue) {
                                return option.inputValue;
                            }

                            return option.text;
                        }}
                        selectOnFocus
                        handleHomeEndKeys
                        id="newItem-auto"
                        freeSolo
                        className={`${formStyles.fbuFormField} ${styles.itemName}`}
                    />

                    <TextField
                        placeholder={'1,00'}
                        id={'newItem-price'}
                        inputRef={krCentsFieldRef}
                        value={values.krCents}
                        onChange={updateValue('krCents')}
                        className={`${formStyles.fbuFormField} ${styles.itemKrCents}`}
                        InputProps={{
                            inputComponent: NumberFormatCustom as any,
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default EditItem;
