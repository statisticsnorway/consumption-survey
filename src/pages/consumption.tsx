import { useTranslation } from 'react-i18next';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import PurchasesCTAGroup from '../components/purchases/cta/PurchasesCTAGroup';
import PurchaseCTA from '../components/purchases/cta/PurchasesCTA';
import { useRouter } from 'next/router';
import { ADD_PURCHASE_MODES, addPurchasePath, PATHS } from '../uiConfig';

const Consumption = () => {
    const router = useRouter();
    const {t} = useTranslation('expenses');
    return (
        <Workspace showFooter={true}>
            <PageTitle title={t('title')}/>

            <PurchasesCTAGroup>
                <PurchaseCTA
                    iconName={'Camera'}
                    text="Skann kvittering"
                    onClick={() => {
                        router.push(addPurchasePath(ADD_PURCHASE_MODES.SCAN));
                    }}
                />
                <PurchaseCTA
                    iconName={'Edit3'}
                    text="Registrer kjøp"
                    onClick={() => {
                        router.push(addPurchasePath(ADD_PURCHASE_MODES.MANUAL));
                    }}
                />
                <PurchaseCTA
                    iconName={'Calendar'}
                    text="Registrer regning"
                    onClick={() => {
                        router.push(PATHS.ADD_REGULAR_EXPENSE);
                    }}
                />
            </PurchasesCTAGroup>
        </Workspace>
    );
};

export default Consumption;
