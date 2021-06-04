import { useTranslation } from 'react-i18next';
import { browserName, osName } from 'react-device-detect';

import styles from './install.module.scss';
import ChromeAppIcon from '../assets/android/ChromeAppIcon';
import SafariIcon from '../assets/iOS/SafariIcon';

const OpenInSupportedBrowser = () => {
    const {t} = useTranslation('install');

    return (
        <div className={styles.unsupported}>
            <p>
                {t('unsupported.leadingText')}
                {t('unsupported.browser')} <span className={styles.browser}>{browserName}</span>
                {t('unsupported.os')} <span className={styles.os}>{osName}</span>
            </p>
            <p className={styles.browser}>{t('unsupported.supported')}</p>
            <div className={styles.browserIcons}>
                <ChromeAppIcon/>
                <SafariIcon/>
            </div>
            <p className={styles.browser}>{t('unsupported.useSupported')}</p>
            <p className={styles.alternative}>{t('unsupported.continueInBrowser')} {t('unsupported.recommendation')}</p>
        </div>
    );
};

export default OpenInSupportedBrowser;
