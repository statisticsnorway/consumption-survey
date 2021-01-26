import { useContext, useEffect, useState } from 'react';
import { RegularExpenseType } from '../firebase/model/RegularExpense';
import uuid from 'uuid';

import EXPENSES_MOCK from './expenses';
import { ExpensesContext } from '../contexts';

const useExpenses = () => {
    const {expenses, setExpenses} = useContext(ExpensesContext);

    const addExpense = (expense: RegularExpenseType) => {
        console.log('Adding expense record', expense);
        const id = uuid();
        setExpenses([
            ...expenses,
            {
                ...expense,
                id,
                registeredTime: new Date().toISOString(),
            }
        ]);

        return Promise.resolve();
    };

    const editExpense = (id: string, newValues: RegularExpenseType) => {
        console.log(`Updating ${id} with `, newValues);
        setExpenses(expenses.map(exp => (exp.id === id) ? newValues : exp));
        return Promise.resolve();
    };

    const deleteExpense = (id: string) => {
        console.log(`Deleting ${id}`);
        setExpenses(expenses.filter(exp => exp.id !== id));

        return Promise.resolve();
    };

    return {expenses, addExpense, editExpense, deleteExpense};
};

export default useExpenses;
