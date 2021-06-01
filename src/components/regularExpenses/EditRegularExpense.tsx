import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExpenseFrequency, RegularExpenseType } from '../../firebase/model/RegularExpense';
import Modal from '../common/dialog/Modal';
import NorwegianCurrencyFormat from '../common/NorwegianCurrencyFormat';

import formStyles from '../common/form/form.module.scss';
import styles from './styles/regularExpenses.module.scss';
import { OpHeader } from '../layout/header/Header';
import LabelledInput from '../common/form/LabelledInput';
import { notEmptyString } from '../../utils/jsUtils';
import LabelledSelect, { SelectOption } from '../common/form/LabelledSelect';
import { LayoutContext } from '../../uiContexts';
import { MessagePanelType } from '../common/blocks/MessagePanel';
import { useRouter } from 'next/router';
import { PATHS } from '../../uiConfig';

const INIT_STATE: RegularExpenseType = {
    id: null,
    name: '',
    frequency: ExpenseFrequency.NONE,
    amount: '',
};

export type AddExpenseProps = {
    expense?: RegularExpenseType;
    show: boolean;
    onSubmit: (expense: RegularExpenseType) => Promise<void>;
    onCancel: () => void;
}

const FREQUENCY_SELECT_OPTIONS = (t) => Object.keys(ExpenseFrequency)
    .map(key => ({key, value: t(`frequency.${key}`)} as SelectOption));

const EditRegularExpense = ({expense, show, onSubmit, onCancel}: AddExpenseProps) => {
    const router = useRouter();
    const {t} = useTranslation('regularExpenses');
    const [values, setValues] = useState(INIT_STATE);
    const nameFieldRef = useRef(null);
    const [skipValidation, setSkipValidation] = useState<boolean>(true);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const [canSubmit, setCanSubmit] = useState(false);

    const {showMessagePanel} = useContext(LayoutContext);

    useEffect(() => {
        setSkipValidation(!isDirty);
    }, [isDirty]);

    const clear = () => {
        setValues(INIT_STATE);
        setIsDirty(false);
        setSkipValidation(true);
    };

    useEffect(() => {
        if (expense) {
            setValues(expense);
        }
    }, [expense]);

    useEffect(() => {
        if (values && values.id) {
            setSkipValidation(false);
        }
    }, [values]);


    useEffect(() => {
        if (show && nameFieldRef.current) {
            nameFieldRef.current.focus();
        }
    }, [show, nameFieldRef]);

    const updateValue = (key) => (value) => {
        setValues({
            ...values,
            [key]: value,
        });

        setIsDirty(true);
    };

    useEffect(() => {
        setCanSubmit(validateAllFields());
    }, [values]);

    const validateAllFields = () => {
        const {name, amount, frequency} = values;
        return (
            notEmptyString(name) &&
            (notEmptyString(amount) && !isNaN(Number(amount))) &&
            (notEmptyString(frequency) && (frequency !== ExpenseFrequency.NONE))
        );
    };

    console.log('expense', expense);
    console.log('values', values);
    console.log('isDirty', isDirty);
    console.log('skipValidation', skipValidation);
    console.log('canSubmit', canSubmit);
    console.log('disable', skipValidation || !canSubmit);

    return (
        <Modal
            show={show}
            showTitle={false}
            showFooter={false}
            fullScreen={true}
            onClose={() => {
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
            <OpHeader
                title={t('addExpense.title')}
                action={{
                    title: t('addExpense.save'),
                    onClick: async () => {
                        if (validateAllFields()) {
                            try {
                                onSubmit(values)
                                    .then(async () => {
                                        await router.push(PATHS.CONSUMPTION);
                                        clear();
                                        showMessagePanel(
                                            MessagePanelType.SUCCESS,
                                            t('addExpense.success'),
                                        );
                                    })
                                    .catch((err) => {
                                        showMessagePanel(
                                            MessagePanelType.ERROR,
                                            JSON.stringify(err)
                                        );
                                    });
                            } catch (err) {
                                showMessagePanel(
                                    MessagePanelType.ERROR,
                                    JSON.stringify(err)
                                );
                            }
                        } else {
                            setErrors({
                                ...errors,
                                name: values.name ? null : 'error',
                                frequency: values.frequency ? null : 'error',
                                amount: values.amount ? null : 'error',
                            });
                        }
                    },
                    disabled: skipValidation || !canSubmit,
                }}
            />
            <div className={`${formStyles.fbuForm} ${styles.addExpenseForm}`}>
                <LabelledInput
                    id="name"
                    label={t('addExpense.name')}
                    value={values.name}
                    validate={nm => skipValidation || (nm && notEmptyString(nm))}
                    errorText={t('addExpense.nameError')}
                    onChange={updateValue('name')}
                    placeholder={t('addExpense.namePlaceholder')}
                />
                <LabelledInput
                    id="amount"
                    label={t('addExpense.krCents')}
                    value={values.amount}
                    InputProps={{
                        inputComponent: NorwegianCurrencyFormat as any,
                    }}
                    validate={amt => skipValidation || (amt && notEmptyString(amt) && !isNaN(Number(amt)))}
                    errorText={t('addExpense.krCentsError')}
                    onChange={updateValue('amount')}
                    placeholder={t('addExpense.krCentsPlaceholder')}
                    styleClass={styles.amount}
                />


                <LabelledSelect
                    id="frequency"
                    label={t('addExpense.frequency')}
                    value={values.frequency}
                    options={FREQUENCY_SELECT_OPTIONS(t)}
                    onUpdate={updateValue('frequency')}
                    placeholder={t('addExpense.frequencyPlaceholder')}
                    validate={freq => skipValidation || (freq && (freq !== ExpenseFrequency.NONE))}
                    errorText={t('addExpense.frequencyError')}
                />
            </div>
        </Modal>
    );
};

export default EditRegularExpense;
