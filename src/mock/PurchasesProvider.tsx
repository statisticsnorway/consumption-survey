import { useEffect, useState } from 'react';
import { PurchasesContext } from '../contexts';
import { PurchasesByDate, PurchaseType } from '../firebase/model/Purchase';
import PURCHASES_MOCK from './purchases.json';

const PurchasesProvider = ({ children }) => {
    const [purchases, setPurchases] = useState<PurchaseType[]>([]);
    const [purchasesByDate, setPurchasesByDate] = useState<PurchasesByDate>({});

    useEffect(() => {
        console.log('Initializing mock');
        // @ts-ignore
        setPurchasesByDate(PURCHASES_MOCK);
        setPurchases(
            Object.keys(PURCHASES_MOCK)
                .reduce((acc, key) => {
                    return acc.concat(PURCHASES_MOCK[key]);
                }, [])
        );
    }, []);

    return (
        <PurchasesContext.Provider value={{
            purchases, setPurchases,
            purchasesByDate, setPurchasesByDate,
        }}>
            {children}
        </PurchasesContext.Provider>
    );
};

export default PurchasesProvider;
