import { useRouter } from 'next/router';
import Workspace from '../../components/layout/workspace/Workspace';
import AddPurchase from '../../components/purchases/AddPurchase';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/common/PageTitle';

const AddPurchasePage = () => {
    const router = useRouter();
    const {t} = useTranslation('purchases');

    const mode = router.query.mode as string;

    return (
        <Workspace showFooter={false}>
            <PageTitle title={t('addPurchase.title')} />
            <AddPurchase mode={mode} />
        </Workspace>
    );
};

export default AddPurchasePage;
