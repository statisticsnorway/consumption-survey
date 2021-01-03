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

type SearchTermExt = SearchTermType & { inputValue?: string };

const filter = createFilterOptions<SearchTermExt>();

export type NewItemInfo = {
    idx: number;
    name: string;
    qty: string;
    units: string;
    kr: string;
    cents: string;
    code?: string;
    searchTermId?: number;
};

const INIT_STATE: NewItemInfo = {
    idx: -1,
    name: '',
    qty: '1',
    units: 'stk',
    kr: '0',
    cents: '00',
    code: undefined,
    searchTermId: undefined,
};

export type NewItemProps = {
    itemInfo?: NewItemInfo;
    show: boolean;
    onAddItem: (item: NewItemInfo) => void;
    onCancel: () => void;
};

const NewItem = ({itemInfo, show, onAddItem, onCancel}: NewItemProps) => {
    const {t} = useTranslation('purchases');
    const formRef = useRef(null);
    const [values, setValues] = useState<NewItemInfo>(INIT_STATE);
    const nameFieldRef = useRef(null);
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
                                label={t('addPurchase.newItem.name.label')}
                                className={`${formStyles.fbuFormField} ${styles.itemName}`}
                            />
                        );
                    }
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {t('addPurchase.newItem.price.kr.label')}
                                </InputAdornment>
                            )
                        }}
                        value={values.kr}
                        required
                        onChange={updateValue('kr')}
                        aria-described-by="kr-helper-text"
                        className={`${formStyles.fbuFormField} ${styles.itemKr}`}
                    />

                    <TextField
                        placeholder={t('addPurchase.newItem.price.cents.placeholder')}
                        id="newItem-cents"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {t('addPurchase.newItem.price.cents.label')}
                                </InputAdornment>
                            )
                        }}
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
