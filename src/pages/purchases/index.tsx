import { useTranslation } from 'react-i18next';
import { WorkspacePanel } from '../../components/layout/Workspace';
import PurchasesList from '../../components/purchases/PurchasesList';

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
