import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LogIn, LogOut } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Text } from '@statisticsnorway/ssb-component-library';
import Notifications from '../common/notifications/Notifications';
import { LayoutContext } from '../../uiContexts';

import styles from './styles/header.module.scss';
import { FireContext, UserContext } from '../../contexts';

const HEADER_EXCLUDE_PAGES = [];

const PAGES_WITH_CUSTOM_HEADER = [
    '/purchases/editPurchase',
    '/v2/purchases/addPurchase',
    '/v2/purchases/editPurchase',
];

const Header = ({siteTitle, version, isOnline}) => {
    const router = useRouter();
    const {isAuthenticated, userInfo, login, logout} = useContext(UserContext);
    const {auth} = useContext(FireContext);
    const {t} = useTranslation('common');
    const [showMenu, setShowMenu] = useState(false);
    const [headerCmp, setHeaderCmp] = useState(null);

    const {showHeader, setShowHeader, headerContent} = useContext(LayoutContext);

    const MENU = (
        <>
            {isAuthenticated &&
            <div className={styles.menuGroup} onClick={async () => { await logout(); }}>
                <span className={styles.menuLabel}>{t('menu.logout')}</span>
                <LogOut width={20} height={20} className={styles.menuIcon}/>
            </div>
            }
            {!isAuthenticated &&
            <div className={styles.menuGroup} onClick={login}>
                <span className={styles.menuLabel}>{t('menu.login')}</span>
                <LogIn width={20} height={20} className={styles.menuIcon}/>
            </div>
            }
        </>
    );

    const DEFAULT_HEADER = (
        <div className={styles.headerComponentWrapper}>
            <div className={styles.leftSection}>
                <div className={styles.logoAndTitle}>
                    <div className={styles.homeNav}>
                        <div className={styles.logoFull}>
                            <img src="/icons/ssb-logo-min.png" alt="SSB Logo"/>
                        </div>
                    </div>
                    <div className={styles.siteTitle}>{siteTitle}</div>
                    &nbsp;
                    {version && <div className={styles.desktopVersionNumber}><Text>v{version}</Text></div>}
                </div>
            </div>
            <div className={styles.rightSection}>
                {MENU}
            </div>
        </div>
    );

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const pageWithCustomHeader = (path) =>
        PAGES_WITH_CUSTOM_HEADER.find(p => path.startsWith(p));

    useEffect(() => {
        const show = !HEADER_EXCLUDE_PAGES.includes(router.pathname);
        setShowHeader(show);

        if (show) {
            if (pageWithCustomHeader(router.pathname)) {
                setHeaderCmp(headerContent || DEFAULT_HEADER);
            } else {
                setHeaderCmp(DEFAULT_HEADER);
            }
        }

    }, [router.pathname, headerContent]);

    return showHeader && headerCmp;
};


export default Header;
