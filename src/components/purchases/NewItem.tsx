import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TextField,
    FormControl,
    Input,
    InputAdornment,
    FormHelperText
} from '@material-ui/core';
import { NewPurchasesContext } from './NewPurchase';
import useClickOutsideDetector from '../../hocs/useClickOutsideDetector';

import formStyles from '../form/form.module.scss';
import styles from './styles/addPurchase.module.scss';
import Modal from '../common/dialog/Modal';

type NewItemState = {
    name: string;
    qty: string;
    kr: string;
    cents: string;
};

const NewItem = () => {
    const {t} = useTranslation('purchases');
    const formRef = useRef(null);
    const nameFieldRef = useRef(null);
    const [showPopup, setShowPopup] = useState(true);

    const [values, setValues] = useState<NewItemState>({
        name: '',
        qty: '1',
        kr: '',
        cents: '',
    });

    useEffect(() => {
        if (showPopup) {
            nameFieldRef.current.focus();
        }
    }, [showPopup]);

    const updateValue = (val: keyof NewItemState) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [val]: e.target.value,
        });
    };

    return (
        <Modal
            show={showPopup}
            onClose={() => {
                if (values.name && values.qty && values.kr) {
                    setShowPopup(false);
                }
            }}
            closeText="Lagre"
            onCancel={() => { setShowPopup(false); }}
            cancelText="Avbryt"
        >
            <div
                ref={(el) => {
                    formRef.current = el;
                }}
                className={`${formStyles.fbuForm} ${styles.newItemForm}`}
            >
                <h3>{t('addPurchase.newItem.title')}</h3>
                <TextField
                    inputRef={nameFieldRef}
                    value={values.name}
                    required
                    label={t('addPurchase.newItem.name.label')}
                    placeholder={t('addPurchase.newItem.name.placeholder')}
                    onChange={updateValue('name')}
                    className={`${formStyles.fbuFormField} ${styles.itemName}`}
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
