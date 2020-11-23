import { useContext, useEffect, useState } from 'react';
import { withTranslation } from 'next-i18next';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { FireContext, UserContext } from '../../contexts';
import { WorkspacePanel } from '../../components/layout/Workspace';
import PurchasesList from '../../components/purchases/PurchasesList';
import NewPurchase from '../../components/purchases/NewPurchase';

const Purchases = ({ t }) => {
    const {firestore} = useContext(FireContext)
    const {userInfo} = useContext(UserContext);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        firestore
            .collection(`/users/${userInfo.userName}/purchases`)
            .onSnapshot(snapShot => {
                console.log('Snapshot fetched for ', userInfo.userName, snapShot.docs);
                const purchaseRecords = snapShot.docs.map(doc => {
                    const { when } = doc.data();
                    return {
                        id: doc.id,
                        ...doc.data(),
                        when: when.toDate().toISOString(),
                        whenRaw: when.valueOf(),                // useful for sorting/comparators
                    }
                });

                setPurchases(purchaseRecords);
            });
    }, []);

    console.log('purchases', purchases);

    return (
        <>
            <h3>Firebase PoC</h3>
            <WorkspacePanel>
                <PurchasesList purchases={purchases}/>
                <NewPurchase/>
            </WorkspacePanel>
        </>
    );
};

export default withTranslation('purchases')(Purchases);
