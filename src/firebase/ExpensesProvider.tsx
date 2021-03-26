import { useContext, useEffect, useState } from 'react';
import { ExpensesContext, UserContext } from '../contexts';
import { RegularExpenseType } from './model/RegularExpense';

const ExpensesProvider = ({children}) => {
    const {userInfo} = useContext(UserContext);
    const [expenses, setExpenses] = useState<RegularExpenseType[]>([]);

    const clearExpenses = () => {
        setExpenses([]);
    };

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
        <ExpensesContext.Provider value={{expenses, setExpenses, clearExpenses}}>
            {children}
        </ExpensesContext.Provider>
    );
};

export default ExpensesProvider;
