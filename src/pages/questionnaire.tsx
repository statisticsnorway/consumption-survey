import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import { useTranslation } from 'react-i18next';

const QuestionnairePage = () => {
    const {t} = useTranslation('questionnaire');

    return (
        <Workspace showFooter={false}>
            <PageTitle title={t('title')}/>
        </Workspace>
    );
};

export default QuestionnairePage;
