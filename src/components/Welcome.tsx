import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { isIOS } from 'react-device-detect';
import IOSInstallInstructions from './help/IOSInstallInstructions';
import AndroidInstallInstructions from './help/AndroidInstallInstructions';

import workspaceStyles from './layout/styles/workspace.module.scss';
import styles from './welcome.module.scss';
import { isPWA } from '../utils/pwaUtils';
import { useRouter } from 'next/router';
import { PATHS } from '../uiConfig';
import { useEffect } from 'react';

const Welcome = () => {
    const router = useRouter();
    const {t} = useTranslation('welcome');

    useEffect(() => {
        /*
        if (isPWA()) {
            router.push(PATHS.DASHBOARD);
        }
         */
    }, []);

    return (
        <>
            <h2>{t('title')}</h2>
            <div className={styles.welcome}>
                <div className={styles.welcomeText}>
                    {t('welcomeText')}
                </div>
                <Link href="/support/onboarding">
                    <span className={styles.loginLink}>{t('loginLinkText')}</span>
                </Link>
                <div className={styles.installText}>
                    {t('installText')}
                </div>

                {isIOS ? <IOSInstallInstructions t={t}/> : <AndroidInstallInstructions t={t}/>}
            </div>
        </>
    );
};

export default Welcome;
