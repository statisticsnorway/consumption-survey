import { useContext, useEffect, useState } from 'react';
import { PurchaseType } from '../firebase/model/Purchase';
import { simpleFormat } from '../utils/dateUtils';
import { PurchasesContext } from '../contexts';
import uuid from 'uuid';

const usePurchases = () => {
    const {
        purchases, setPurchases,
        purchasesByDate, setPurchasesByDate,
    } = useContext(PurchasesContext);

    const addPurchase = (purchase: PurchaseType) => {
        console.log('adding new purchase', purchase);
        const id = uuid();
        setPurchases([
            ...purchases,
            {
                id,
                ...purchase,
            },
        ]);

        setPurchasesByDate({
            ...purchasesByDate,
            [simpleFormat(new Date(purchase.when))]: [
                { id, ...purchase }
            ],
        });

        return Promise.resolve();
    };

    useEffect(() => {
        console.log('change detected', purchases, purchasesByDate);
    }, [purchases, purchasesByDate]);

    const editPurchase = (id: string, newValues: PurchaseType) => {
        console.log('modifying ', id, newValues);
        const other = purchases.filter(p => p.id !== id);
        setPurchases([
            ...other,
            newValues,
        ]);

        const updDt = simpleFormat(new Date(newValues.when));
        const otherPurchases = purchasesByDate[updDt]
            .filter(p => p.id !== id);

        setPurchasesByDate({
            ...purchasesByDate,
            [updDt]: [
                ...otherPurchases,
                newValues,
            ],
        });

        return Promise.resolve();
    };

    // console.log('purchases', purchases);
    return {purchases, purchasesByDate, addPurchase, editPurchase};
};

export default usePurchases;
