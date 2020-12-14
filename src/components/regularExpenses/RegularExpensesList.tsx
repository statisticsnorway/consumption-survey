import { RegularExpenseType } from '../../firebase/model/RegularExpense';
import { useTranslation } from 'react-i18next';
import useExpenses from '../../hocs/useExpenses';

import styles from './styles/regularExpenses.module.scss';

export type RegularExpensesProps = {
}
const RegularExpensesList = ({}: RegularExpensesProps) => {
    const { t} = useTranslation('regularExpenses');
    const { expenses } = useExpenses();
    return (Array.isArray(expenses) && expenses.length > 0) ? (
        <div className={styles.regularExpenses}>
            {expenses.map((expense) => (
                <div className={styles.expense} key={expense.id}>
                    <div className={`${styles.expenseColumn} ${styles.name}`}>{expense.name}</div>
                    <div className={`${styles.expenseColumn} ${styles.frequency}`}>{t(`frequency.${expense.frequency}`)}</div>
                    <div className={`${styles.expenseColumn} ${styles.amount}`}>{expense.amount}</div>
                </div>
            ))}
        </div>
    ) : (
        <span className={styles.noRecords}>{t('regularExpenses.noRecords')}</span>
    );
};

export default RegularExpensesList;
