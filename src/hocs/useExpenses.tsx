import { useContext, useEffect, useState } from 'react';
import { FireContext, UserContext } from '../contexts';
import { RegularExpenseType } from '../firebase/model/RegularExpense';
import exp from 'constants';

const useExpenses = () => {
    const {firestore} = useContext(FireContext);
    const {userInfo} = useContext(UserContext);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        firestore
            .collection(`/users/${userInfo.userName}/regularExpenses`)
            .onSnapshot(snapShot => {
                console.log('Snapshot fetched for ', userInfo.userName, snapShot.docs);
                const expenseRecords = snapShot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data(),
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
            .add(expense);
    }

    const editExpense = (id: string, newValues: RegularExpenseType) => {
        console.log(`Updating ${id} with `, newValues);
        return firestore
            .collection(`/users/${userInfo.userName}/regularExpenses`)
            .doc(`/${id}`)
            .update(newValues);
    };

    const deleteExpense = (id: string) => {
        console.log(`Deleting ${id}`);
        return firestore
            .collection(`/users/${userInfo.userName}/regularExpenses`)
            .doc(`/${id}`)
            .delete();
    };

    return {expenses, addExpense, editExpense, deleteExpense};
};

export default useExpenses;
