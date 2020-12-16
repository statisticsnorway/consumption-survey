import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, RotateCw, X } from 'react-feather';
import { ExpenseFrequency } from '../../firebase/model/RegularExpense';
import AddExpense from './AddExpense';
import FloatingButton from '../common/buttons/FloatingButton';
import useExpenses from '../../hocs/useExpenses';

import dashboardStyles from '../../pages/dashboard/dashboard.module.scss';
import styles from './styles/regularExpenses.module.scss';

export type RegularExpensesProps = {};

const RegularExpensesList = ({}: RegularExpensesProps) => {
    const {t} = useTranslation('regularExpenses');
    const {expenses, addExpense} = useExpenses();
    const [showAddExpense, setShowAddExpense] = useState(false);

    const FLOATING_BTN_OPTIONS = {
        title: t('addExpense.title'),
        iconResting: <Plus/>,
        iconActive: <Plus/>,
        onClick: () => {
            setShowAddExpense(true);
        }
    };

    const expensesComp = (Array.isArray(expenses) && expenses.length > 0) ? (
        <div className={styles.regularExpenses}>
            <div className={`${styles.expense} ${styles.expenseHeaderRow}`} key="expensesHeader">
                <div className={`${styles.expenseColumnHeader} ${styles.name}`}>{t('header.name')}</div>
                <div className={`${styles.expenseColumnHeader} ${styles.frequency}`}>
                    <RotateCw width={16} height={16} className={styles.frequencyIcon}/>
                </div>
                <div className={`${styles.expenseColumnHeader} ${styles.amount}`}>{t('header.amount')}</div>
            </div>
            {expenses.map((expense) => (
                <div className={styles.expense} key={expense.id}>
                    <div className={`${styles.expenseColumn} ${styles.name}`}>{expense.name}</div>
                    <div className={`${styles.expenseColumn} ${styles.frequency}`}>
                        {(expense.frequency === ExpenseFrequency.NONE) ?
                            '' :
                            t(`frequency.${expense.frequency}`)
                        }
                    </div>
                    <div className={`${styles.expenseColumn} ${styles.amount}`}>
                        {`${expense.kr},${expense.cents}`}
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
            <AddExpense
                show={showAddExpense}
                onSubmit={({ name, frequency, kr, cents}) => {
                    addExpense({
                        name,
                        frequency,
                        kr: parseInt(kr),
                        cents: parseInt(cents)
                    })
                        .then(res => {
                            console.log('added new expense');
                            setShowAddExpense(false);
                        });
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
