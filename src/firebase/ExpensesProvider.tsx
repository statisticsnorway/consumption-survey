import { useEffect, useState } from 'react';
import { ExpensesContext } from '../contexts';
import { RegularExpenseType } from './model/RegularExpense';

const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState<RegularExpenseType[]>([]);

    /**
     * Uncomment this for some mocking
     *
    useEffect(() => {
        console.log('Initializing mock');
        // @ts-ignore
        setExpenses(EXPENSES_MOCK);
    }, []);
     */

    return (
        <ExpensesContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpensesContext.Provider>
    );
};

export default ExpensesProvider;
