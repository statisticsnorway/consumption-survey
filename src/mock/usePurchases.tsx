import { useContext, useEffect, useState } from 'react';
import { PurchaseType } from '../firebase/model/Purchase';

import PURCHASES_MOCK from './purchases.json';

const usePurchases = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        setPurchases(PURCHASES_MOCK);
    }, []);

    const addPurchase = (purchase: PurchaseType) => {
        console.log('adding new purchase', purchase);
        setPurchases([
            ...purchases,
            purchase
        ]);

        return Promise.resolve();
    };

    // console.log('purchases', purchases);
    return { purchases, addPurchase };
};

export default usePurchases;
