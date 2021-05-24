import { useRouter } from 'next/router';
import Workspace from '../../../components/layout/workspace/Workspace';
import AddPurchase from '../../../components/purchases/addPurchase/AddPurchase';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../../components/common/PageTitle';
import { PATHS } from '../../../uiConfig';
import { OpHeader } from '../../../components/layout/header/Header';
import OpLayout from '../../../components/layout/OpLayout';

const AddPurchasePage = () => {
    const router = useRouter();
    const {t} = useTranslation('purchases');

    const mode = router.query.mode as string;

    const headerComp = (
        <OpHeader
            title={t('addPurchase.title')}
            action={{
                title: t('addPurchase.cancel'),
                onClick: () => {
                    router.push(PATHS.HOME);
                }
            }}
        />
    );

    return (
        <Workspace showFooter={false} headerComp={headerComp}>
            <PageTitle title={t('addPurchase.title')}/>
            <AddPurchase mode={mode}/>
        </Workspace>
    );
};

AddPurchasePage.getLayout = (children) =>
    <OpLayout showAppHeader={false}>{children}</OpLayout>

export default AddPurchasePage;
