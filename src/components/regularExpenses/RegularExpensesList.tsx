import { ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, MinusCircle } from 'react-feather';
import { ExpenseFrequency, RegularExpenseType } from '../../firebase/model/RegularExpense';
import EditRegularExpense from './EditRegularExpense';
import { krCents } from '../../utils/jsUtils';
import DeleteConfirmDialog from '../common/dialog/DeleteConfirmDialog';
import NoRecords from '../common/blocks/NoRecords';
import useExpenses from '../../hocs/useExpenses';
import { UserContext } from '../../contexts';
import {StatusConstants, UserStatusesKeys} from '../../firebase/model/User';
import { LogContext } from '../../uiContexts';

import workspaceStyles from '../layout/workspace/workspace.module.scss';
import styles from './styles/regularExpenses.module.scss';

export type RegularExpensesProps = {
    showExpensesList?: boolean;
    showAddExpenseDialog?: boolean;
    onComplete?: () => void;
};

// not sure why we were added uuid if it was not present earlier.
// just returning values as is, for now.
export const convert = (values: RegularExpenseType) => values;

const RegularExpensesList = ({showExpensesList = true, showAddExpenseDialog = false, onComplete}: RegularExpensesProps) => {
    const {t} = useTranslation('regularExpenses');
    const {updateUserStatus} = useContext(UserContext);
    const {logger} = useContext(LogContext);
    const {expenses, addExpense, editExpense, deleteExpense} = useExpenses();
    const [showAddExpense, setShowAddExpense] = useState(showAddExpenseDialog);
    const [expensesVisible, setExpensesVisible] = useState<boolean>(true);

    useEffect(() => {
        setShowAddExpense(showAddExpenseDialog);
    }, [showAddExpenseDialog]);

    const toggleExpensesVisibility = () => {
        setExpensesVisible(!expensesVisible);
    };

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
        if (showExpensesList) {
            const listComp = (Array.isArray(expenses) && expenses.length > 0) ? (
                <>
                    {expensesVisible &&
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
                    }
                </>
            ) : (
                <NoRecords singularText="ny utgift" pluralText="de faste ugiftene" showAddNew={false}/>
            );

            const comp = (
                <div className={workspaceStyles.section}>
                    <div className={workspaceStyles.sectionHeader}>
                        <span className={workspaceStyles.sectionTitle}>
                            {t('sections.regularExpenses.title')}
                        </span>
                        <span className={workspaceStyles.sectionVisibility} onClick={toggleExpensesVisibility}>
                            {expensesVisible && <ChevronDown/>}
                            {!expensesVisible && <ChevronUp/>}
                        </span>
                    </div>
                    {listComp}
                </div>
            );

            setExpensesComp(comp);
        }
    }, [expenses, expensesVisible]);

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
