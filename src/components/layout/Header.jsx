import { useState } from 'react';
import { Text } from '@statisticsnorway/ssb-component-library';
import styles from './styles/header.module.scss';
import Notifications from '../common/notifications/Notifications';

const Header = ({siteTitle, version}) => {
    const [menuIsOpen, toggleMenu] = useState(false);

    return (
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
                <Notifications/>
            </div>
        </div>
    );
};

export default Header;
