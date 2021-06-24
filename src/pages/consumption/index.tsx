import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Workspace from '../../components/layout/workspace/Workspace';
import PageTitle from '../../components/common/PageTitle';
import PurchasesCTAGroup from '../../components/purchases/cta/PurchasesCTAGroup';
import PurchaseCTA from '../../components/purchases/cta/PurchasesCTA';
import { PATHS } from '../../uiConfig';
import useReceiptUpload from '../../hocs/useReceiptUpload';
import RegularExpensesList from '../../components/regularExpenses/RegularExpensesList';
import useExpenses from '../../hocs/useExpenses';
import usePurchases from '../../hocs/usePurchases';
import { isRegularExpenseComplete, RegularExpenseStatus } from '../../firebase/model/RegularExpense';
import { isPurchaseComplete, PurchaseStatus } from '../../firebase/model/Purchase';
import { StatusConstants } from '../../firebase/model/User';
import { UserContext, UserStatusesKeys } from '../../contexts';
import { LogContext } from '../../uiContexts';

const PurchasesListNoSSR = dynamic(
    () => import('../../components/purchases/PurchasesList'),
    {ssr: false}
);

const Consumption = () => {
    const router = useRouter();
    const {t: ht} = useTranslation('home');
    const {t} = useTranslation('expenses');
    const [showAddExpenseDialog, setShowAddExpenseDialog] = useState<boolean>(false);

    const {expenses} = useExpenses();
    const {purchases} = usePurchases();
    const {updateUserStatus} = useContext(UserContext);
    const {logger} = useContext(LogContext);

    useEffect(() => {
        const expComp = (expenses || []).find(exp => isRegularExpenseComplete(exp.status));
        const pComp = (purchases || []).find(p => isPurchaseComplete(p.status));

        const journalStatus = (expComp || pComp) ?
            StatusConstants.STARTED :
            StatusConstants.NOT_STARTED;

        updateUserStatus(UserStatusesKeys.JOURNAL_STATUS, journalStatus)
            .then(() => {
                logger.debug('Journal Status updated to %s', journalStatus);
            });
    }, [expenses, purchases]);

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
                        setShowAddExpenseDialog(true);
                    }}
                />
            </PurchasesCTAGroup>
            {hiddenUploadComponent}
            <PurchasesListNoSSR/>
            <RegularExpensesList
                showAddExpenseDialog={showAddExpenseDialog}
                onComplete={() => {
                    setShowAddExpenseDialog(false);
                }}
            />
        </Workspace>
    );
};

export default Consumption;
