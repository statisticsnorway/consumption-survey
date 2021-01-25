import { useEffect, useState } from 'react';
import { ExpensesContext } from '../contexts';
import EXPENSES_MOCK from './expenses';
import { RegularExpenseType } from '../firebase/model/RegularExpense';

const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState<RegularExpenseType[]>();

    useEffect(() => {
        console.log('Initializing mock');
        // @ts-ignore
        setExpenses(EXPENSES_MOCK);
    }, []);

    return (
        <ExpensesContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpensesContext.Provider>
    );
};

export default ExpensesProvider;
