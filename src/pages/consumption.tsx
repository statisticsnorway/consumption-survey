import { useTranslation } from 'react-i18next';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';

const Consumption = () => {
    const {t} = useTranslation('expenses');
    return (
        <Workspace showFooter={true}>
            <PageTitle title={t('title')} />
        </Workspace>
    );
};

export default Consumption;
