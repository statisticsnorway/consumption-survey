import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import NorwegianCurrencyFormat from '../common/NorwegianCurrencyFormat';
import useSearchTerms from '../../hocs/useSearchTerms';
import Modal from '../common/dialog/Modal';
import Loader from '../common/Loader';
import { ArrowLeft } from 'react-feather';
import { SearchTermType } from '../../firebase/model/SearchTerm';
import { ItemType } from '../../firebase/model/Purchase';

import styles from './styles/item.module.scss';
import formStyles from '../common/form/form.module.scss';
import LabelledInput from '../common/form/LabelledInput';
import { notEmptyString } from '../../utils/jsUtils';
import { OpHeader } from '../layout/header/Header';

export type EditItemProps = {
    item: ItemType;
    show: boolean;
    onUpdate: (oldValues: ItemType, newValues: ItemType) => void;
    onCancel: () => void;
};

type SearchTermExt = SearchTermType & { inputValue?: string };

const filter = createFilterOptions<SearchTermExt>();

const EditItem = ({item, show, onUpdate, onCancel}: EditItemProps) => {
    const [values, setValues] = useState<ItemType>(item);
    const {searchTerms} = useSearchTerms();
    const {t} = useTranslation('purchases');

    const [skipValidation, setSkipValidation] = useState<boolean>(true);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    // refs
    const nameFieldRef = useRef(null);
    const amountFieldRef = useRef(null);
    const qtyFieldRef = useRef(null);

    // errors
    const [errors, setErrors] = useState<ItemType>({} as ItemType);

    // kludges
    const [showPopup, setShowPopup] = useState(show);
    useEffect(() => {
        setShowPopup(show);
        setValues(item);
    }, [show, item]);

    useEffect(() => {
        if (showPopup && nameFieldRef && nameFieldRef.current) {
            nameFieldRef.current.focus();
        }
    }, [showPopup, nameFieldRef]);

    const clearErrors = () => {
        setErrors({} as ItemType);
    };

    const onClose = () => {
        console.log('verifying', values);

        if (values.name && values.qty && values.amount) {
            onUpdate(item, values);
            setShowPopup(false);
            clearErrors();
        } else {
            setErrors({
                ...errors,
                name: values.name ? null : 'error',
                qty: values.qty ? null : 'error',
                amount: values.amount ? null : 'error',
            });
        }
    };
    const onCancelEdit = () => {
        setShowPopup(false);
        clearErrors();
        onCancel();
    };

    useEffect(() => {
        if (item) {
            setValues(item);
        }
    }, [item]);

    const updateValue = (key) => (value) => {
        setValues({
            ...values,
            [key]: value,
        });

        setIsDirty(true);
    };

    useEffect(() => {
        setSkipValidation(!isDirty);
    }, [isDirty]);

    const validateAllFields = () => {
        if (!values) {
            return false;
        }

        return (
            values.name &&
            (values.qty && !isNaN(Number(values.qty))) &&
            (values.amount && !isNaN(Number(values.amount)))
        );
    };

    useEffect(() => {
        if (values && (values.idx !== -1)) {
            setSkipValidation(false);
        }

        setCanSubmit(validateAllFields());
    }, [values]);

    const extractValFromAutoComplete = (evt, newValue) => {
        console.log('selected', newValue, 'target', evt.target.value);
        if (!newValue) {
            return {};
        }

        if (typeof newValue === 'string') {
            return {name: newValue};
        } else if (newValue && newValue.inputValue) {
            return {name: newValue.inputValue};
        } else {
            console.log('val with code', newValue);
            const {id, text, coicopCode: code, units} = newValue;

            return {
                searchTermId: id || null,
                name: text,
                code: code || null,
                units: units || values.units,
            }
        }
    };

    console.log('values before render', values);

    return values ? (
        <Modal
            show={showPopup}
            showTitle={false}
            onClose={onClose}
            closeText={t('addPurchase.close')}
            onCancel={onCancelEdit}
            cancelText={t('addPurchase.cancel')}
            fullScreen={true}
            showFooter={false}
        >
            <div className={styles.editItemDialog}>
                <OpHeader
                    title={t('lineItems.title')}
                    action={{
                        title: t('lineItems.editItem.save'),
                        onClick: onClose,
                        disabled: skipValidation || !canSubmit,
                    }}
                />
                <div className={`${formStyles.fbuForm} ${styles.newItemForm}`}>
                    <Autocomplete
                        inputValue={values.name}
                        options={searchTerms as SearchTermExt[]}
                        renderOption={(option: SearchTermExt) => {
                            return (
                                <div className={styles.searchTermOption}>
                                    <span className={styles.searchTermName}>{option.text}</span>
                                </div>
                            );
                        }}
                        autoHighlight
                        renderInput={(params) => (
                            <LabelledInput
                                id="newItemName"
                                label={t('addPurchase.newItem.name.label')}
                                inputRef={nameFieldRef}
                                placeholder={t('addPurchase.newItem.name.placeholder')}
                                value={values.name}
                                onChange={updateValue('name')}
                                validate={nm => skipValidation || notEmptyString(nm)}
                                errorText={t('addPurchase.newItem.name.errorText')}
                                {...params}
                            />
                        )}
                        onChange={(evt, newValue) => {
                            setValues({
                                ...values,
                                ...extractValFromAutoComplete(evt, newValue),
                            });


                            if (amountFieldRef && amountFieldRef.current) {
                                amountFieldRef.current.focus();
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params) as SearchTermExt[];

                            if (params.inputValue !== '') {
                                filtered.push({
                                    inputValue: params.inputValue,
                                    text: `${t('addPurchase.newItem.addNewTerm')} "${params.inputValue}"`,
                                    id: null,
                                    coicopCode: null
                                });
                            }

                            return filtered;
                        }}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            } else if (option.inputValue) {
                                return option.inputValue;
                            } else {
                                return option.text;
                            }
                        }}
                        selectOnFocus
                        handleHomeEndKeys
                        id="newItem-auto"
                        freeSolo
                        className={formStyles.fbuFormGroup}
                    />
                    <div className={`${formStyles.fbuFormGroup} ${styles.qtyAmountGroup}`}>
                        <LabelledInput
                            id="newItemQty"
                            value={values.qty}
                            label={t('addPurchase.newItem.qty.label')}
                            validate={qty => skipValidation || (notEmptyString(qty) && !isNaN(Number(qty)))}
                            errorText={t('addPurchase.newItem.qty.errorText')}
                            onChange={updateValue('qty')}
                            InputProps={{
                                inputComponent: NorwegianCurrencyFormat as any,
                            }}
                            styleClass={styles.qty}
                        />
                        <LabelledInput
                            id="newItemAmount"
                            value={values.amount}
                            label={t('addPurchase.newItem.amount.label')}
                            validate={amt => skipValidation || (notEmptyString(amt) && !isNaN(Number(amt)))}
                            errorText={t('addPurchase.newItem.amount.errorText')}
                            InputProps={{
                                inputComponent: NorwegianCurrencyFormat as any,
                            }}
                            onChange={updateValue('amount')}
                            placeholder={t('addPurchase.newItem.amount.placeholder')}
                            styleClass={styles.amount}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    ) : (show && <Loader/>);
};

export default EditItem;
