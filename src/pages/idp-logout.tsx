import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FireContext, UserContext } from '../contexts';
import { PATHS } from '../uiConfig';
import Workspace from '../components/layout/workspace/Workspace';
import { useTranslation } from 'react-i18next';

const IDPLogout = () => {
    const router = useRouter();
    const {t} = useTranslation('common');
    const {logout} = useContext(UserContext);
    const {reset} = useContext(FireContext);

    const fireReset = async () => {
        reset()
    };

    useEffect(() => {
        const doFireLogout = async () => {
            console.log('Starting firebase logout');

            await logout();
            await fireReset();
            console.log('Finished firebase logout, redirecting to home page');

            await router.push(PATHS.HOME);
        };

        doFireLogout();
    }, []);
    return (
        <Workspace showFooter={false}>
            {t('logoutSuccess')}
        </Workspace>
    );
};

export default IDPLogout;
