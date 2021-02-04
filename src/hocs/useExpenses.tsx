import { useContext, useEffect, useState } from 'react';
import { ExpensesContext, FireContext, UserContext } from '../contexts';
import { RegularExpenseType } from '../firebase/model/RegularExpense';

const useExpenses = () => {
    const {firestore} = useContext(FireContext);
    const {userInfo} = useContext(UserContext);
    const {expenses, setExpenses} = useContext(ExpensesContext);

    useEffect(() => {
        firestore
            .collection(`/users/${userInfo.userName}/regularExpenses`)
            .onSnapshot(snapShot => {
                console.log('Snapshot fetched for ', userInfo.userName, snapShot.docs);
                const expenseRecords = snapShot.docs.map(doc => {
                    return {
                        ...(doc.data() as RegularExpenseType),
                        // ensure id is set *AFTEr* the doc content to ensure we use firebase id all places
                        id: doc.id,
                    }
                });

                setExpenses(expenseRecords);
                console.log('EXPENSES', JSON.stringify(expenseRecords));
            })
    }, []);

    const addExpense = (expense: RegularExpenseType) => {
        console.log('Adding expense record', expense);
        return firestore
            .collection(`/users/${userInfo.userName}/regularExpenses`)
            .add({
                ...expense,
                registeredTime: new Date().toISOString(),
            });
    }

    const editExpense = (id: string, newValues: RegularExpenseType) => {
        console.log(`Updating ${id} with `, newValues);
        return firestore
            .doc(`/users/${userInfo.userName}/regularExpenses/${id}`)
            .update(newValues);
    };

    const deleteExpense = (id: string) => {
        console.log(`Deleting ${id}`);
        return firestore
            .doc(`/users/${userInfo.userName}/regularExpenses/${id}`)
            .delete();
    };

    return {expenses, addExpense, editExpense, deleteExpense};
};

export default useExpenses;
