import { useContext, useEffect, useState } from 'react';
import { FireContext, UserContext, PurchasesContext } from '../contexts';
import { PurchaseType } from '../firebase/model/Purchase';

const usePurchases = () => {
    const {firestore} = useContext(FireContext);
    const {userInfo} = useContext(UserContext);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        console.log(`Fetching purchases ...  /users/${userInfo.userName}/purchases`);
        try {
            firestore
                .collection(`/users/${userInfo.userName}/purchases`)
                .onSnapshot(snapShot => {
                    console.log('Snapshot fetched for ', userInfo.userName, snapShot.docs);
                    const purchaseRecords = snapShot.docs.map(doc => {
                        const {when} = doc.data();
                        return {
                            id: doc.id,
                            ...doc.data(),
                            when: when.toDate().toISOString(),
                            whenRaw: when.valueOf(),                // useful for sorting/comparators
                        }
                    });

                    setPurchases(purchaseRecords);
                    console.log("Purchases", JSON.stringify(purchaseRecords));
                });
        } catch (err) {
            console.log('unable to fetch purchases', err);
        }
    }, []);

    const addPurchase = (purchase: PurchaseType) => {
        console.log('adding new purchase', purchase);
        return firestore
            .collection(`/users/${userInfo.userName}/purchases`)
            .add(purchase)
    };

    // console.log('purchases', purchases);
    return { purchases, addPurchase };
};

export default usePurchases;
