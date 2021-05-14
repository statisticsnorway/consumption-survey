import { useTranslation } from 'react-i18next';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import PurchasesCTAGroup from '../components/purchases/cta/PurchasesCTAGroup';
import PurchaseCTA from '../components/purchases/cta/PurchasesCTA';

const Consumption = () => {
    const {t} = useTranslation('expenses');
    return (
        <Workspace showFooter={true}>
            <PageTitle title={t('title')} />

            <PurchasesCTAGroup>
                <PurchaseCTA iconName={'Camera'} text="Skann kvittering" onClick={() => {}} />
                <PurchaseCTA iconName={'Edit3'} text="Registrer kjøp" onClick={() => {}} />
                <PurchaseCTA iconName={'Calendar'} text="Registrer regning" onClick={() => {}} />
            </PurchasesCTAGroup>
        </Workspace>
    );
};

export default Consumption;
