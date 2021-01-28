import { useContext, useEffect, useState } from 'react';
import { FireContext, UserContext, PurchasesContext } from '../contexts';
import { PurchaseType } from '../firebase/model/Purchase';
import { simpleFormat } from '../utils/dateUtils';

const usePurchases = () => {
        const {firestore} = useContext(FireContext);
        const {userInfo} = useContext(UserContext);
        const {purchases, purchasesByDate, setPurchases, setPurchasesByDate} = useContext(PurchasesContext);

        useEffect(() => {
            console.log('v2 fetching purchases');
            try {
                firestore
                    .collection(`/users/${userInfo.userName}/purchases`)
                    .onSnapshot(ps => {
                        const pRecords = ps.docs.map(p => {
                            const {purchaseDate} = p.data();
                            return {
                                ...(p.data() as PurchaseType),
                                purchaseDate: purchaseDate.toDate().toISOString(),
                                id: p.id,
                            };
                        });

                        setPurchases(pRecords);

                        const pbd = pRecords.reduce((acc, p) => {
                            const dt = simpleFormat(new Date(p.purchaseDate));
                            const curr = acc[dt] || [];
                            acc[dt] = curr.concat(p);
                            return acc;
                        }, {});

                        setPurchasesByDate(pbd);
                    });
            } catch (err) {
                console.log('Could not fetch purchases', err);
            }
        }, []);

        /*
        useEffect(() => {
            console.log(`Fetching purchases ...  /users/${userInfo.userName}/purchases`);
            try {
                firestore
                    .collection(`/users/${userInfo.userName}/purchases`)
                    .onSnapshot(pbdSnapshot => {
                        console.log('pbdSnapshot', pbdSnapshot.size);
                        pbdSnapshot.docs.map(pbdDoc => {
                            const dt = pbdDoc.id;
                            console.log('found entries for ', dt);

                            pbdDoc.ref.collection('entries')
                                .onSnapshot(snapShot => {
                                    console.log('purchases records found');
                                    const purchaseRecords = snapShot.docs.map(doc => {
                                        console.log('record', doc.id);
                                        const {purchaseDate} = doc.data();
                                        return {
                                            ...(doc.data() as PurchaseType),
                                            id: doc.id,
                                            purchaseDate: purchaseDate.toDate().toISOString(),
                                            purchaseDateRaw: purchaseDate.valueOf(),                // useful for sorting/comparators
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
         */

        const addPurchase = (purchase: PurchaseType) => {
            console.log('adding new purchase', purchase);

            const dt = simpleFormat(purchase.purchaseDate);

            return firestore
                .collection(`/users/${userInfo.userName}/purchases`)
                .add({
                    ...purchase,
                    registeredTime: new Date().toISOString(),
                });
        };

        const editPurchase = (id: string, newValues: PurchaseType) => {
            console.log('editing', id);
            const dt = simpleFormat(newValues.purchaseDate);

            return firestore
                .doc(`/users/${userInfo.userName}/purchases/${dt}/entries/${id}`)
                .set(newValues);
        };

        const deletePurchase = (purchase: PurchaseType) => {
            console.log('deleting', purchase.id);
            const dt = simpleFormat(purchase.purchaseDate);

            return firestore
                .doc(`/users/${userInfo.userName}/purchases/${dt}/entries/${purchase.id}`)
                .delete();
        };

        return {purchases, purchasesByDate, addPurchase, editPurchase, deletePurchase};
    }
;

export default usePurchases;
