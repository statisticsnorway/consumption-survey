import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TextField,
    FormControl,
    Input,
    InputAdornment,
    FormHelperText
} from '@material-ui/core';

import formStyles from '../form/form.module.scss';
import styles from './styles/addPurchase.module.scss';

type NewItemState = {
    name: string;
    qty: string;
    kr: string;
    cents: string;
};

const NewItem = () => {
    const {t} = useTranslation('purchases');
    const nameFieldRef = useRef(null);
    const [values, setValues] = useState<NewItemState>({
        name: '',
        qty: '1',
        kr: '0',
        cents: '00',
    });

    useEffect(() => {
        nameFieldRef.current.focus();
    }, []);

    const updateValue = (val: keyof NewItemState) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [val]: e.target.value,
        });
    };

    return (
        <div className={`${formStyles.fbuForm} ${styles.newItemForm}`}>
            <h3>{t('addPurchase.newItem.title')}</h3>
            <TextField
                inputRef={nameFieldRef}
                value={values.name}
                label={t('addPurchase.newItem.name.label')}
                placeholder={t('addPurchase.newItem.name.placeholder')}
                onChange={updateValue('name')}
                className={`${formStyles.fbuFormField} ${styles.itemName}`}
            />

            <div className={`${formStyles.fbuFormGroup} ${styles.itemQtyGroup}`}>
                <div className={formStyles.fbuFormField}>
                    <Input
                        placeholder={t('addPurchase.newItem.qty.placeholder')}
                        id="newItem-qty"
                        value={values.qty}
                        onChange={updateValue('qty')}
                        aria-described-by="qty-helper-text"
                        inputProps={{
                            'aria-label': 'quantity'
                        }}
                        className={`${styles.itemQty}`}
                    />
                    <FormHelperText
                        id="qty-helper-text"
                        className={formStyles.fbuFormFieldHelp}
                    >
                        {t('addPurchase.newItem.qty.label')}
                    </FormHelperText>
                </div>
                <div className={formStyles.fbuFormField}>
                    <Input
                        placeholder={t('addPurchase.newItem.price.kr.placeholder')}
                        id="newItem-kr"
                        value={values.kr}
                        onChange={updateValue('kr')}
                        aria-described-by="kr-helper-text"
                        inputProps={{
                            'aria-label': 'price-kr'
                        }}
                        className={`${styles.itemKr}`}
                    />
                    <FormHelperText
                        id="kr-helper-text"
                        className={formStyles.fbuFormFieldHelp}
                    >
                        {t('addPurchase.newItem.price.kr.label')}
                    </FormHelperText>
                </div>
                <div className={formStyles.fbuFormField}>
                    <Input
                        placeholder={t('addPurchase.newItem.price.cents.placeholder')}
                        id="newItem-cents"
                        value={values.cents}
                        onChange={updateValue('cents')}
                        aria-described-by="cents-helper-text"
                        inputProps={{
                            'aria-label': 'price-cents'
                        }}
                        className={`${styles.itemCents}`}
                    />
                    <FormHelperText
                        className={formStyles.fbuFormFieldHelp}
                        id="cents-helper-text"
                    >
                        {t('addPurchase.newItem.price.cents.label')}
                    </FormHelperText>
                </div>
            </div>
        </div>
    );
};

export default NewItem;
