import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit3, RotateCw, X } from 'react-feather';
import { ExpenseFrequency, RegularExpenseType } from '../../firebase/model/RegularExpense';
import AddEditExpense from './AddEditExpense';
import FloatingButton from '../common/buttons/FloatingButton';
// import useExpenses from '../../hocs/useExpenses';
import useExpenses from '../../mock/useExpenses';

import dashboardStyles from '../../pages/dashboard/dashboard.module.scss';
import styles from './styles/regularExpenses.module.scss';
import exp from 'constants';
import { krCents } from '../../utils/jsUtils';

export type RegularExpensesProps = {};

export const convert = (values: RegularExpenseType) => {
    const {id, amount, frequency, name} = values;
    return {
        id,
        name,
        frequency,
        amount,
    };
};

const RegularExpensesList = ({}: RegularExpensesProps) => {
    const {t} = useTranslation('regularExpenses');
    const {expenses, addExpense, editExpense} = useExpenses();
    const [showAddExpense, setShowAddExpense] = useState(false);

    const [expenseForEdit, setExpenseForEdit] = useState(null);

    const FLOATING_BTN_OPTIONS = {
        title: t('addExpense.title'),
        iconResting: <Plus/>,
        iconActive: <Plus/>,
        onClick: () => {
            setShowAddExpense(true);
        }
    };

    const tableHeader = (
        <div className={`${styles.expense} ${styles.expenseHeaderRow}`} key="expensesHeader">
            <div className={`${styles.expenseColumnHeader} ${styles.name}`}>{t('header.name')}</div>
            <div className={`${styles.expenseColumnHeader} ${styles.amount}`}>{t('header.amount')}</div>
            <div className={`${styles.expenseColumnHeader} ${styles.editExpense}`}></div>
        </div>
    );

    const expensesComp = (Array.isArray(expenses) && expenses.length > 0) ? (
        <div className={styles.regularExpenses}>
            {expenses.map((expense: RegularExpenseType) => (
                <div
                    className={styles.expense}
                    key={expense.id}
                    onClick={() => {
                        console.log('Should init editing of', expense);
                        setExpenseForEdit(expense);
                        setShowAddExpense(true);
                    }}
                >
                    <div className={`${styles.expenseColumn} ${styles.nameFrequency}`}>
                        <span className={styles.name}>{expense.name}</span>
                        <span className={styles.frequency}>
                            {(expense.frequency === ExpenseFrequency.NONE) ?
                                '' :
                                t(`frequency.${expense.frequency}`)
                            }
                        </span>
                    </div>
                    <div className={`${styles.expenseColumn} ${styles.amount}`}>
                        {krCents(expense.amount)}
                    </div>
                    <div className={`${styles.expenseColumn} ${styles.editExpense}`}>
                        <Edit3
                            width={16}
                            height={16}
                            onClick={() => {
                                console.log('Should init editing of', expense);
                                setExpenseForEdit(expense);
                                setShowAddExpense(true);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <span className={styles.noRecords}>{t('regularExpenses.noRecords')}</span>
    );

    return (
        <>
            {expensesComp}
            <AddEditExpense
                expense={expenseForEdit}
                show={showAddExpense}
                onSubmit={(newValues: RegularExpenseType) => {
                    if (expenseForEdit) {
                        editExpense(expenseForEdit.id, convert(newValues))
                            .then((res) => {
                                console.log('regular expense updated');
                                setShowAddExpense(false);
                            })
                            .catch((err) => {
                                console.log('regular expense update failed');
                            });
                    } else {
                        addExpense(convert(newValues))
                            .then(res => {
                                console.log('added new expense');
                                setShowAddExpense(false);
                            });
                    }
                }}
                onCancel={() => {
                    setShowAddExpense(false);
                }}
            />
            {!showAddExpense &&
            <FloatingButton
                mainProps={FLOATING_BTN_OPTIONS}
                className={`${dashboardStyles.floatingAddExpense} floatingAddExpense`}
                bgOverlay={false}
            />
            }
        </>
    );
};

export default RegularExpensesList;
