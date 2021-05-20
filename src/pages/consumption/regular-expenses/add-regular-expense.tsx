import Workspace from '../../../components/layout/workspace/Workspace';
import PageTitle from '../../../components/common/PageTitle';
import { useTranslation } from 'react-i18next';

const AddRegularExpensePage = () => {
    const {t} = useTranslation('regularExpenses');
    return (
        <Workspace showFooter={false}>
            <PageTitle title={t('addExpense.title')} />
        </Workspace>
    );
};

export default AddRegularExpensePage;
