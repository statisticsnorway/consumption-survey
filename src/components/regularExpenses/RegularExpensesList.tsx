import { ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MinusCircle } from 'react-feather';
import { ExpenseFrequency, RegularExpenseType } from '../../firebase/model/RegularExpense';
import EditRegularExpense from './EditRegularExpense';
import { krCents } from '../../utils/jsUtils';
import DeleteConfirmDialog from '../common/dialog/DeleteConfirmDialog';
import NoRecords from '../common/blocks/NoRecords';
import useExpenses from '../../hocs/useExpenses';

import styles from './styles/regularExpenses.module.scss';
import { useRouter } from 'next/router';
import { PATHS } from '../../uiConfig';
import { LayoutContext } from '../../uiContexts';
import { MessagePanelType } from '../common/blocks/MessagePanel';

export type RegularExpensesProps = {
    showExpensesList?: boolean;
    showAddExpenseDialog?: boolean;
    onComplete?: () => void;
};

// not sure why we were added uuid if it was not present earlier.
// just returning values as is, for now.
export const convert = (values: RegularExpenseType) => values;

const RegularExpensesList = ({ showExpensesList = true, showAddExpenseDialog = false, onComplete }: RegularExpensesProps) => {
    const router = useRouter();
    const {t} = useTranslation('regularExpenses');
    const {expenses, addExpense, editExpense, deleteExpense} = useExpenses();
    const [showAddExpense, setShowAddExpense] = useState(showAddExpenseDialog);

    useEffect(() => {
        setShowAddExpense(showAddExpenseDialog);
    }, [showAddExpenseDialog]);

    const [expenseForEdit, setExpenseForEdit] = useState(null);
    const [expenseForDelete, setExpenseForDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [expensesComp, setExpensesComp] = useState<ReactNode>();

    const onDelete = (exp) => {
        setExpenseForDelete(exp);
        setShowDeleteConfirm(true);
    };

    useEffect(() => {
        console.log('new list', expenses);
        const comp = (showExpensesList && (Array.isArray(expenses) && expenses.length > 0)) ? (
            <div className={styles.regularExpenses}>
                {expenses.map((expense: RegularExpenseType) => (
                    <div
                        className={styles.expense}
                        key={expense.id}
                    >
                        <div
                            className={`${styles.expenseColumn} ${styles.nameFrequency}`}
                            onClick={() => {
                                setExpenseForEdit(expense);
                                setShowAddExpense(true);
                            }}
                        >
                            <span className={styles.name}>{expense.name}</span>
                            <span className={styles.frequency}>
                            {(expense.frequency === ExpenseFrequency.NONE) ?
                                '' :
                                t(`frequency.${expense.frequency}`)
                            }
                        </span>
                        </div>
                        <div
                            className={`${styles.expenseColumn} ${styles.amount}`}
                            onClick={() => {
                                setExpenseForEdit(expense);
                                setShowAddExpense(true);
                            }}
                        >
                            {krCents(expense.amount)}
                        </div>
                        <div
                            className={`${styles.expenseColumn} ${styles.deleteExpense}`}
                            onClick={() => {
                                onDelete(expense);
                            }}
                        >
                            <MinusCircle
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <NoRecords singularText="en ny utgift" pluralText="de faste ugiftene" />
        );

        setExpensesComp(comp);
    }, [expenses]);

    const tableHeader = (
        <div className={`${styles.expense} ${styles.expenseHeaderRow}`} key="expensesHeader">
            <div className={`${styles.expenseColumnHeader} ${styles.name}`}>{t('header.name')}</div>
            <div className={`${styles.expenseColumnHeader} ${styles.amount}`}>{t('header.amount')}</div>
            <div className={`${styles.expenseColumnHeader} ${styles.editExpense}`}></div>
        </div>
    );

    const clearDelete = () => {
        setExpenseForDelete(null);
        setShowDeleteConfirm(false);
    };

    return (
        <>
            {expensesComp}
            <EditRegularExpense
                expense={expenseForEdit}
                show={showAddExpense}
                onSubmit={async (newValues: RegularExpenseType) => {
                    try {
                        if (expenseForEdit) {
                            editExpense(expenseForEdit.id, convert(newValues))
                                .then(async (res) => {
                                    if (typeof onComplete === 'function') {
                                        onComplete();
                                    }
                                    console.log('regular expense updated');
                                });
                        } else {
                            addExpense(convert(newValues))
                                .then(async res => {
                                    if (typeof onComplete === 'function') {
                                        onComplete();
                                    }
                                    console.log('added new expense');
                                });
                        }
                    } catch (err) {
                        throw err;
                    }
                }}
                onCancel={() => {
                    setShowAddExpense(false);
                }}
            />
            {expenseForDelete &&
            <DeleteConfirmDialog
                show={showDeleteConfirm}
                leadingText={t('deleteExpense.text')}
                warningText={t('deleteExpense.textWarning')}
                info={expenseForDelete.name}
                onCancel={clearDelete}
                onConfirm={() => {
                    deleteExpense(expenseForDelete.id).then(res => {
                        console.log('Expense deleted');
                    });
                    clearDelete();
                }}
                cancelText={t('deleteExpense.cancelText')}
                confirmText={t('deleteExpense.confirmText')}
            />
            }
        </>
    );
};

export default RegularExpensesList;
