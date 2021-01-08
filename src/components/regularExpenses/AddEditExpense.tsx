import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExpenseFrequency, RegularExpenseType } from '../../firebase/model/RegularExpense';
import Modal from '../common/dialog/Modal';

import formStyles from '../form/form.module.scss';
import styles from './styles/regularExpenses.module.scss';
import { TextField, MenuItem } from '@material-ui/core';
import NorwegianCurrencyFormat from '../common/NorwegianCurrencyFormat';

const INIT_STATE: RegularExpenseType = {
    name: '',
    frequency: ExpenseFrequency.NONE,
    amount: '',
};

export type AddExpenseProps = {
    expense?: RegularExpenseType;
    show: boolean;
    onSubmit: (expense: RegularExpenseType) => void;
    onCancel: () => void;
}

const FREQUENCY_OPTIONS = (t) => Object.keys(ExpenseFrequency)
    .map(key => (
        <MenuItem key={key} value={key}>
            {t(`frequency.${key}`)}
        </MenuItem>
    ))

const AddEditExpense = ({expense, show, onSubmit, onCancel}: AddExpenseProps) => {
    const {t} = useTranslation('regularExpenses');
    const [values, setValues] = useState(INIT_STATE);
    const nameFieldRef = useRef(null);

    const clear = () => {
        setValues(INIT_STATE);
    };

    useEffect(() => {
        if (expense) {
            setValues(expense);
        }
    }, [expense]);

    useEffect(() => {
        if (show && nameFieldRef.current) {
            nameFieldRef.current.focus();
        }
    }, [show, nameFieldRef]);

    const updateValue = (key: keyof RegularExpenseType) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [key]: e.target.value,
        });
    };

    return (
        <Modal
            show={show}
            title={t('addExpense.title')}
            onClose={() => {
                onSubmit(values);
                clear();
            }}
            closeText={t('addExpense.save')}
            onCancel={() => {
                if (!expense) {
                    clear();
                }
                onCancel();
            }}
            cancelText={t('addExpense.cancel')}
        >
            <div className={`${formStyles.fbuForm} ${styles.addExpenseForm}`}>
                <div className={`${formStyles.fbuFormGroup} ${styles.nameAmountGroup}`}>
                    <TextField
                        value={values.name}
                        placeholder={t('addExpense.namePlaceholder')}
                        className={`${formStyles.fbuFormField} ${styles.expenseName}`}
                        onChange={updateValue('name')}
                        inputRef={nameFieldRef}
                    />
                    <TextField
                        value={values.amount}
                        placeholder={t('addExpense.krCentsPlaceholder')}
                        className={`${formStyles.fbuFormField} ${styles.addExpenseKrCents}`}
                        onChange={updateValue('amount')}
                        InputProps={{
                            inputComponent: NorwegianCurrencyFormat as any,
                        }}
                    />
                </div>

                <div className={`${formStyles.fbuFormGroup} ${styles.frequencyAmountGroup}`}>
                    <TextField
                        value={values.frequency}
                        select
                        onChange={updateValue('frequency')}
                        placeholder={t('addExpense.frequencyPlaceholder')}
                        className={`${formStyles.fbuFormField} ${styles.addExpenseFrequency} muiPadBottom`}
                    >
                        {FREQUENCY_OPTIONS(t)}
                    </TextField>

                </div>
            </div>
        </Modal>
    );
};

export default AddEditExpense;
