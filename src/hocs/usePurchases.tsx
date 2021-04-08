import { useContext, useEffect } from 'react';
import { FireContext, PurchasesContext, UserContext } from '../contexts';
import { PurchaseStatus, PurchaseType, isPurchaseComplete } from '../firebase/model/Purchase';
import { simpleFormat } from '../utils/dateUtils';
import useReceipts from './useReceipts';
import usePouch from '../pouchdb/usePouch';
import { PouchDBContext } from '../uiContexts';

const usePurchases = () => {
        const {firestore} = useContext(FireContext);
        const {userInfo} = useContext(UserContext);
        const {purchases, purchasesByDate, setPurchases, setPurchasesByDate, clearPurchases} = useContext(PurchasesContext);
        const {receiptsDBReady, getReceiptWithImageUrl} = useReceipts();

        useEffect(() => {
            if (!userInfo) {
                clearPurchases();
            }
        }, [userInfo]);

        const extractDate = (dt) => {
            return (typeof dt === 'string')
                ? new Date(dt).toISOString()
                : dt.toDate().toISOString();
        };

        useEffect(() => {
            if (receiptsDBReady) {
                console.log('receipts db is ready, v2 fetching purchases');
                loadPurchases();
            }
        }, [receiptsDBReady]);

        const loadPurchases = () => {
            try {
                firestore
                    .collection(`/users/${userInfo.userName}/purchases`)
                    .onSnapshot(ps => {
                        const pRecords = ps.docs.map(p => {
                            const {purchaseDate} = p.data();
                            const purchase = p.data() as PurchaseType;

                            const withImgs = [];
                            if (purchase.receipts) {
                                purchase.receipts.forEach(r => {
                                    console.log('loading image', r.imageId, r.imageName, r.contentType);
                                    if (r.imageId && r.imageName) {
                                        getReceiptWithImageUrl(r.imageId, r.imageName)
                                            .then(withImg => {
                                                const afterImgLoad = {
                                                    ...purchase,
                                                    receipts: [{...r, ...withImg}],
                                                };

                                                console.log('yy new state', afterImgLoad);
                                                withImgs.push({ ...r, ...withImg });
                                            })
                                            .catch((err) => {
                                                console.log('Could not load', r.imageId, r.imageName, err);
                                                console.log('Ignoring for now ...');
                                                return r;
                                            });
                                    }
                                });
                            }

                            if (withImgs.length < 1) {
                                console.log('------> could not read previews');
                            } else {
                                console.log('~~~~> ', withImgs);
                            }

                            return {
                                ...purchase,
                                receipts: || purchase.receipts,
                                purchaseDate: purchaseDate ? extractDate(purchaseDate) : null,
                                // ensure id is set *AFTER* the doc content to ensure we use firebase id all places
                                id: p.id,
                            };
                        });

                        setPurchases(pRecords);

                        const pbd = pRecords.reduce((acc, p) => {
                            if (isPurchaseComplete(p.status)) {
                                return acc;
                            } else {
                                const dt = simpleFormat(new Date(p.purchaseDate));
                                const curr = acc[dt] || [];
                                acc[dt] = curr.concat(p);
                                return acc;
                            }
                        }, {});

                        setPurchasesByDate(pbd);
                    });
            } catch (err) {
                console.log('Could not fetch purchases', err);
            }
        };

        useEffect(() => {
            if (purchases) {
                const pbd = purchases.reduce((acc, p) => {
                    if (!isPurchaseComplete(p.status)) {
                        return acc;
                    } else {
                        const dt = simpleFormat(new Date(p.purchaseDate));
                        const curr = acc[dt] || [];
                        acc[dt] = curr.concat(p);
                        return acc;
                    }
                }, {});

                setPurchasesByDate(pbd);
            }
        }, [purchases]);

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

        const initPurchase = () => {
            console.log('initializing empty purchase');
            return firestore
                .collection(`/users/${userInfo.userName}/purchases`)
                .add({
                    registeredTime: new Date().toISOString(),
                    status: PurchaseStatus.CREATED,
                });
        };

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
            console.log('editing', id, newValues);

            return firestore
                .doc(`/users/${userInfo.userName}/purchases/${id}`)
                .set(newValues, {merge: true});
        };

        const deletePurchase = (purchase: PurchaseType) => {
            console.log('deleting', purchase.id, purchase.purchaseDate, typeof purchase.purchaseDate);

            return firestore
                .doc(`/users/${userInfo.userName}/purchases/${purchase.id}`)
                .delete();
        };

        return {purchases, purchasesByDate, initPurchase, addPurchase, editPurchase, deletePurchase};
    }
;

export default usePurchases;
