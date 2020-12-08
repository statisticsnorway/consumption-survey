import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Text } from '@statisticsnorway/ssb-component-library';
import styles from './styles/header.module.scss';
import Notifications from '../common/notifications/Notifications';
import { LayoutContext } from '../../uiContexts';

const HEADER_EXCLUDE_PAGES = [
];

const Header = ({siteTitle, version, isOnline}) => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const {showHeader, setShowHeader} = useContext(LayoutContext);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        setShowHeader(!HEADER_EXCLUDE_PAGES.includes(router.pathname));
    }, [router.pathname]);

    return (
        <>
            {showHeader &&
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
            </div>}
        </>
    );
};

export default Header;
