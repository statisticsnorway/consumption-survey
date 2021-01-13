import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Text } from '@statisticsnorway/ssb-component-library';
import styles from './styles/header.module.scss';
import Notifications from '../common/notifications/Notifications';
import { LayoutContext } from '../../uiContexts';

const HEADER_EXCLUDE_PAGES = [];

const PAGES_WITH_CUSTOM_HEADER = [
    '/purchases/editPurchase',
];

const Header = ({siteTitle, version, isOnline}) => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const [headerCmp, setHeaderCmp] = useState(null);

    const {showHeader, setShowHeader, headerContent} = useContext(LayoutContext);

    const DEFAULT_HEADER = (
        <div className={styles.headerComponentWrapper}>
            <div className={styles.leftSection}>
                <div className={styles.logoAndTitle}>
                    <div className={styles.homeNav}>
                        <div className={styles.logoFull}>
                            <img src="/icons/maskable_icon-96x96.png" alt="SSB Logo"/>
                        </div>
                    </div>
                    <div className={styles.siteTitle}>{siteTitle}</div>
                    &nbsp;
                    {version && <div className={styles.desktopVersionNumber}><Text>v{version}</Text></div>}
                </div>
            </div>
            <div className={styles.rightSection}>
                <Notifications showBadge={isOnline} isOnline={isOnline}/>
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
