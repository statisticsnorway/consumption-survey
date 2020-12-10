import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import useSearchTerms from '../../hocs/useSearchTerms';

import formStyles from '../form/form.module.scss';
import styles from './styles/addPurchase.module.scss';
import Modal from '../common/dialog/Modal';
import { SearchTermType } from '../../firebase/model/SearchTerm';

type SearchTermExt = SearchTermType & { inputValue?: string };

const filter = createFilterOptions<SearchTermExt>();

export type NewItemInfo = {
    name: string;
    qty: string;
    units: string;
    kr: string;
    cents: string;
    code?: string;
    searchTermId?: number;
};

const INIT_STATE: NewItemInfo = {
    name: '',
    qty: '1',
    units: 'stk',
    kr: '0',
    cents: '00',
    code: undefined,
    searchTermId: undefined,
};

export type NewItemProps = {
    show: boolean;
    onAddItem: (item: NewItemInfo) => void;
    onCancel: () => void;
};

const NewItem = ({show, onAddItem, onCancel}: NewItemProps) => {
    const {t} = useTranslation('purchases');
    const formRef = useRef(null);
    const [values, setValues] = useState<NewItemInfo>(INIT_STATE);
    const nameFieldRef = useRef(null);
    const nameFieldRefAc = useRef(null);
    const [showPopup, setShowPopup] = useState(show);
    const {searchTerms} = useSearchTerms();

    useEffect(() => {
        setShowPopup(show);
    }, [show]);


    useEffect(() => {
        if (showPopup) {
            nameFieldRefAc.current.focus();
        }
    }, [showPopup]);

    const updateValue = (val: keyof NewItemInfo) => (e: ChangeEvent<HTMLInputElement>) => {
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

    return (
        <Modal
            show={showPopup}
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
                <h3>{t('addPurchase.newItem.title')}</h3>
                <Autocomplete
                    options={searchTerms as SearchTermExt[]}
                    renderOption={(option: SearchTermExt) => option.text}
                    renderInput={(params) =>
                        <TextField
                            inputRef={nameFieldRefAc}
                            placeholder={t('addPurchase.newItem.name.placeholder')}
                            required
                            value={values.name}
                            onChange={updateValue('name')}
                            {...params}
                            label={t('addPurchase.newItem.name.label')}
                            className={`${formStyles.fbuFormField} ${styles.itemName}`}
                        />
                    }
                    onChange={(evt, newValue) => {
                        setValues({
                            ...values,
                            ...extractValFromAutoComplete(evt, newValue),
                        })
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
                    className={`${formStyles.fbuFormField}`}
                />

                <div className={`${formStyles.fbuFormGroup} ${styles.itemQtyGroup}`}>
                    <TextField
                        placeholder={t('addPurchase.newItem.qty.placeholder')}
                        id="newItem-qty"
                        label={t('addPurchase.newItem.qty.label')}
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

                    <TextField
                        placeholder={t('addPurchase.newItem.price.kr.placeholder')}
                        id="newItem-kr"
                        label={t('addPurchase.newItem.price.kr.label')}
                        value={values.kr}
                        required
                        onChange={updateValue('kr')}
                        aria-described-by="kr-helper-text"
                        className={`${formStyles.fbuFormField} ${styles.itemKr}`}
                    />

                    <TextField
                        placeholder={t('addPurchase.newItem.price.cents.placeholder')}
                        id="newItem-cents"
                        label={t('addPurchase.newItem.price.cents.label')}
                        value={values.cents}
                        onChange={updateValue('cents')}
                        aria-described-by="cents-helper-text"
                        className={`${formStyles.fbuFormField} ${styles.itemCents}`}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default NewItem;
