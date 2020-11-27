import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WorkspacePanel } from '../../components/layout/Workspace';
import PurchasesList from '../../components/purchases/PurchasesList';
import usePurchases from '../../hocs/usePurchases';
import { FireContext, UserContext } from '../../contexts';

const Purchases = () => {
    const {t} = useTranslation('purchases');

    return (
        <>
            <h3>Firebase PoC</h3>
            <WorkspacePanel>
                <PurchasesList />
            </WorkspacePanel>
        </>
    );
};

export default Purchases;
