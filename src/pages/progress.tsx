import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import { useContext } from 'react';
import { UserContext } from '../contexts';
import { useTranslation } from 'react-i18next';

const Progress = () => {
    const {userInfo, isAuthenticated} = useContext(UserContext);
    const {t} = useTranslation('progress');
    console.log('userInfo', isAuthenticated, userInfo);
    return (
        <Workspace>
            <PageTitle title={t('title')} />
        </Workspace>
    );
};

export default Progress;
