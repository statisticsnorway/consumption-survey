import { useContext, useEffect, useState } from 'react';
import { FireContext, UserContext, PurchasesContext } from '../contexts';
import { PurchaseType } from '../firebase/model/Purchase';
import { simpleFormat } from '../utils/dateUtils';

const usePurchases = () => {
    const {firestore} = useContext(FireContext);
    const {userInfo} = useContext(UserContext);
    const [purchases, setPurchases] = useState([]);
    const [purchasesByDate, setPurchasesByDate] = useState({});

    useEffect(() => {
        console.log(`Fetching purchases ...  /users/${userInfo.userName}/purchases`);
        try {
            firestore
                .collection(`/users/${userInfo.userName}/purchases`)
                .onSnapshot(pbdSnapshot => {
                    console.log('pbdSnapshot');
                    pbdSnapshot.docs.map(pbdDoc => {
                        const dt = pbdDoc.id;

                        pbdDoc.ref.collection('entries')
                            .onSnapshot(snapShot => {
                                const purchaseRecords = snapShot.docs.map(doc => {
                                    const {when} = doc.data();
                                    return {
                                        id: doc.id,
                                        ...doc.data(),
                                        when: when.toDate().toISOString(),
                                        whenRaw: when.valueOf(),                // useful for sorting/comparators
                                    }
                                });

                                setPurchasesByDate({
                                    ...purchasesByDate,
                                    [dt]: purchaseRecords,
                                });

                                setPurchases([
                                    ...purchases,
                                    ...purchaseRecords,
                                ]);
                            });
                    });
                });
        } catch (err) {
            console.log('unable to fetch purchases', err);
        }
    }, []);

    const addPurchase = (purchase: PurchaseType) => {
        console.log('adding new purchase', purchase);

        const dt = simpleFormat(purchase.when);

        return firestore
            .collection(`/users/${userInfo.userName}/purchases/${dt}/entries`)
            .add(purchase)
    };

    // console.log('purchases', purchases);
    return {purchases, addPurchase};
};

export default usePurchases;
