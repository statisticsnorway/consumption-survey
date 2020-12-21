import { useContext, useEffect, useState } from 'react';
import { PurchaseType } from '../firebase/model/Purchase';

import PURCHASES_MOCK from './purchases.json';

const usePurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [purchasesByDate, setPurchasesByDate] = useState({});

    useEffect(() => {
        setPurchasesByDate(PURCHASES_MOCK);

        setPurchases(
            Object.keys(PURCHASES_MOCK)
                .reduce((acc, key) => {
                    return acc.concat(PURCHASES_MOCK[key]);
                }, [])
        );
    }, []);

    useEffect(() => {
        if (purchases.length > 0) {
            console.log('purchases', purchases);
        }
    }, [purchases]);

    const addPurchase = (purchase: PurchaseType) => {
        console.log('adding new purchase', purchase);
        setPurchases([
            ...purchases,
            purchase
        ]);

        return Promise.resolve();
    };

    // console.log('purchases', purchases);
    return {purchases, purchasesByDate, addPurchase};
};

export default usePurchases;
