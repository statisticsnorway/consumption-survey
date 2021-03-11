import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { ArrowLeft } from 'react-feather';
import Modal from '../../common/dialog/Modal';
import { ItemType } from '../../../firebase/model/Purchase';
import Loader from '../../common/Loader';
import { SearchTermType } from '../../../firebase/model/SearchTerm';
import useSearchTerms from '../../../hocs/useSearchTerms';

import styles from './styles/item.module.scss';
import formStyles from '../../form/form.module.scss';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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

    // refs
    const nameFieldRef = useRef(null);

    // errors
    const [errors, setErrors] = useState<ItemType>({} as ItemType);

    // kludges
    const [showPopup, setShowPopup] = useState(show);
    useEffect(() => {
        setShowPopup(show);
        setValues(item);
    }, [show, item]);

    useEffect(() => {
        if (showPopup) {
            nameFieldRef.current.focus();
        }
    }, [showPopup]);

    const clearErrors = () => {
        setErrors({} as ItemType);
    };

    const onClose = () => {
        console.log('verifying', values);

        if (values.name) {
            onUpdate(item, values);
            setShowPopup(false);
            clearErrors();
        } else {
            setErrors({
                ...errors,
                name: values.name ? null : 'error',
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

    const updateValue = (key: keyof ItemType) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [key]: e.target.value,
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
        } else {
            const {id, text, code, units} = newValue;
            return {
                searchTermId: id,
                name: text,
                code,
                units: units || values.units,
            }
        }
    };

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
                <div className={styles.headerZone}>
                    <div className={styles.leftSection} onClick={onCancelEdit}>
                        <ArrowLeft className={styles.icon} width={20} height={20}/>
                        {t('lineItems.editItem.cancel')}
                    </div>
                    <div className={styles.rightSection} onClick={onClose}>
                        <span className={styles.saveChangesLink}>{t('lineItems.editItem.save')}</span>
                    </div>
                </div>
                <div className={`${formStyles.fbuForm} ${styles.newItemForm}`}>
                    <div className={`${formStyles.fbuFormGroup} ${styles.itemNamePriceGroup}`}>
                        <Autocomplete
                            inputValue={values.name}
                            options={searchTerms as SearchTermExt[]}
                            renderOption={(option: SearchTermExt) => option.text}
                            renderInput={(params) => (
                                <TextField
                                    inputRef={nameFieldRef}
                                    placeholder={t('addPurchase.newItem.name.placeholder')}
                                    required
                                    value={values.name}
                                    onChange={updateValue('name')}
                                    {...params}
                                    className={`${formStyles.fbuFormField} ${styles.itemName}`}
                                    error={errors['name'] === 'error'}
                                />
                            )}
                            onChange={(evt, newValue) => {
                                setValues({
                                    ...values,
                                    ...extractValFromAutoComplete(evt, newValue),
                                });

                                // ToDo: shift focus to amountField
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params) as SearchTermExt[];

                                if (params.inputValue !== '') {
                                    filtered.push({
                                        inputValue: params.inputValue,
                                        text: `${t('addPurchase.newItem.addNewTerm')} "${params.inputValue}"`,
                                        id: null,
                                        coicopCode: null,
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
                            className={`${formStyles.fbuFormField} ${styles.itemName}`}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    ) : (show && <Loader/>);
};

export default EditItem;
