import { useEffect, useState } from 'react';
import { PurchasesContext } from '../contexts';
import { PurchasesByDate, PurchaseType } from './model/Purchase';
import PURCHASES_MOCK from '../mock/purchases';

const PurchasesProvider = ({ children }) => {
    const [purchases, setPurchases] = useState<PurchaseType[]>([]);
    const [purchasesByDate, setPurchasesByDate] = useState<PurchasesByDate>({});

    useEffect(() => {
        console.log('Initializing mock');

        /**
         * Uncomment this for some mocking!
        setPurchasesByDate(PURCHASES_MOCK);
        setPurchases(
            Object.keys(PURCHASES_MOCK)
                .reduce((acc, key) => {
                    return acc.concat(PURCHASES_MOCK[key]);
                }, [])
        );
         */
    }, []);

    const clearPurchases = () => {
      setPurchasesByDate({});
      setPurchases([]);
    };

    return (
        <PurchasesContext.Provider value={{
            purchases, setPurchases,
            purchasesByDate, setPurchasesByDate,
            clearPurchases,
        }}>
            {children}
        </PurchasesContext.Provider>
    );
};

export default PurchasesProvider;
