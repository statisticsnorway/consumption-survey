import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import Workspace from '../../components/layout/workspace/Workspace';
import PageTitle from '../../components/common/PageTitle';
import PurchasesCTAGroup from '../../components/purchases/cta/PurchasesCTAGroup';
import PurchaseCTA from '../../components/purchases/cta/PurchasesCTA';
import { useRouter } from 'next/router';
import { ADD_PURCHASE_MODES, addPurchasePath, PATHS } from '../../uiConfig';
import useReceiptUpload from '../../hocs/useReceiptUpload';

const PurchasesListNoSSR = dynamic(
    () => import('../../components/purchases/PurchasesList'),
    { ssr: false }
);

const Consumption = () => {
    const router = useRouter();
    const {t: ht} = useTranslation('home');
    const {t} = useTranslation('expenses');

    const onSuccessfulAdd = async (purchaseId) => {
        console.log('receipt uploaded, redirecting', purchaseId);
        await router.push(`${PATHS.CONSUMPTION}?highlight=${purchaseId}`);
    };

    const {hiddenUploadComponent, captureReceiptFromCameraOrLibrary} = useReceiptUpload(onSuccessfulAdd);

    console.log('hiddenComponent', hiddenUploadComponent);

    return (
        <Workspace showFooter={true}>
            <PageTitle title={t('title')}/>

            <PurchasesCTAGroup>
                <PurchaseCTA
                    iconName={'Camera'}
                    text={ht('registerNew.fromReceipt')}
                    onClick={() => {
                        captureReceiptFromCameraOrLibrary();
                    }}
                />
                <PurchaseCTA
                    iconName={'Edit3'}
                    text={ht('registerNew.manually')}
                    onClick={() => {
                        router.push(PATHS.EDIT_PURCHASE);
                    }}
                />
                <PurchaseCTA
                    iconName={'Calendar'}
                    text={ht('registerNew.regularExpense')}
                    onClick={() => {
                        router.push(PATHS.ADD_REGULAR_EXPENSE);
                    }}
                />
            </PurchasesCTAGroup>
            {hiddenUploadComponent}
            <PurchasesListNoSSR />
        </Workspace>
    );
};

export default Consumption;
