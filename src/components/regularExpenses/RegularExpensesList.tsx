import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, MinusCircle, RotateCw, X } from 'react-feather';
import uuid from 'uuid';
import { ExpenseFrequency, RegularExpenseType } from '../../firebase/model/RegularExpense';
import AddEditExpense from './AddEditExpense';
import FloatingButton from '../common/buttons/FloatingButton';
import useExpenses from '../../hocs/useExpenses';
// import useExpenses from '../../mock/useExpenses';
import { krCents } from '../../utils/jsUtils';
import DeleteConfirmDialog from '../common/dialog/DeleteConfirmDialog';
import NoRecords from '../common/blocks/NoRecords';

import dashboardStyles from '../../pages/dashboard/dashboard.module.scss';
import styles from './styles/regularExpenses.module.scss';

export type RegularExpensesProps = {};

export const convert = (values: RegularExpenseType) => {
    const {id, amount, frequency, name} = values;
    return {
        id: id || uuid(),
        name,
        frequency,
        amount,
    };
};

const RegularExpensesList = ({}: RegularExpensesProps) => {
    const {t} = useTranslation('regularExpenses');
    const {expenses, addExpense, editExpense, deleteExpense} = useExpenses();
    const [showAddExpense, setShowAddExpense] = useState(false);

    const [expenseForEdit, setExpenseForEdit] = useState(null);
    const [expenseForDelete, setExpenseForDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [expensesComp, setExpensesComp] = useState<ReactNode>();

    const onDelete = (exp) => {
        setExpenseForDelete(exp);
        setShowDeleteConfirm(true);
    };

    const FLOATING_BTN_OPTIONS = {
        title: t('addExpense.title'),
        iconResting: <Plus/>,
        iconActive: <Plus/>,
        onClick: () => {
            setShowAddExpense(true);
        }
    };

    useEffect(() => {
        console.log('new list', expenses);
        const comp = (Array.isArray(expenses) && expenses.length > 0) ? (
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
