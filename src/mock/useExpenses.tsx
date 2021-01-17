import { useEffect, useState } from 'react';
import { RegularExpenseType } from '../firebase/model/RegularExpense';

import EXPENSES_MOCK from './expenses.json';

const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        setExpenses(EXPENSES_MOCK);
    }, []);

    const addExpense = (expense: RegularExpenseType) => {
        console.log('Adding expense record', expense);
        setExpenses([
            ...expenses,
            expense
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
