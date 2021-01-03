import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExpenseFrequency, RegularExpenseType } from '../../firebase/model/RegularExpense';
import Modal from '../common/dialog/Modal';

import formStyles from '../form/form.module.scss';
import styles from './styles/regularExpenses.module.scss';
import { TextField, MenuItem } from '@material-ui/core';

export type ExpenseInfo = {
    name: string;
    frequency: ExpenseFrequency;
    kr: string;
    cents: string;
}

const INIT_STATE: ExpenseInfo = {
    name: '',
    frequency: ExpenseFrequency.NONE,
    kr: '0',
    cents: '00',
};

export type AddExpenseProps = {
    expense?: ExpenseInfo;
    show: boolean;
    onSubmit: (expense: ExpenseInfo) => void;
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

    const updateValue = (key: keyof ExpenseInfo) => (e: ChangeEvent<HTMLInputElement>) => {
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
            }}
            closeText={t('addExpense.save')}
            onCancel={() => {
                if (!expense) { clear(); }
                onCancel();
            }}
            cancelText={t('addExpense.cancel')}
        >
            <div className={`${formStyles.fbuForm} ${styles.addExpenseForm}`}>
                <TextField
                    value={values.name}
                    label={t('addExpense.nameLabel')}
                    placeholder={t('addExpense.namePlaceholder')}
                    className={`${formStyles.fbuFormField} ${styles.expenseName}`}
                    onChange={updateValue('name')}
                    inputRef={nameFieldRef}
                />

                <div className={`${formStyles.fbuFormGroup} ${styles.frequencyAmountGroup}`}>
                    <TextField
                        value={values.frequency}
                        select
                        onChange={updateValue('frequency')}
                        label={t('addExpense.frequencyLabel')}
                        placeholder={t('addExpense.frequencyPlaceholder')}
                        className={`${formStyles.fbuFormField} ${styles.addExpenseFrequency} muiPadBottom`}
                    >
                        {FREQUENCY_OPTIONS(t)}
                    </TextField>
                    <TextField
                        value={values.kr}
                        label={t('addExpense.krLabel')}
                        placeholder={t('addExpense.krPlaceholder')}
                        className={`${formStyles.fbuFormField} ${styles.addExpenseKr}`}
                        onChange={updateValue('kr')}
                    />
                    <TextField
                        value={values.cents}
                        label={t('addExpense.centsLabel')}
                        placeholder={t('addExpense.centsPlaceholder')}
                        className={`${formStyles.fbuFormField} ${styles.addExpenseCents}`}
                        onChange={updateValue('cents')}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AddEditExpense;
