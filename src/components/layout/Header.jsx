import { useState } from 'react';
import Link from 'next/link';
import { Bell } from 'react-feather';
import { Text } from '@statisticsnorway/ssb-component-library';

import styles from './styles/header.module.scss';

const Header = ({siteTitle, version}) => {
    const [menuIsOpen, toggleMenu] = useState(false);

    return (
        <div className={styles.headerComponentWrapper}>
            <div className={styles.leftSection}>
                <div className={styles.logoAndTitle}>
                    <div className={styles.homeNav}>
                        <div className={styles.logoFull}>
                            <img src="/icons/maskable_icon-96x96.png"/>
                        </div>
                    </div>
                    <div className={styles.siteTitle}>{siteTitle}</div>
                    &nbsp;
                    {version && <div className={styles.desktopVersionNumber}><Text>v{version}</Text></div>}
                </div>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.actionIcons}>
                    <a className={`${styles.actionIcon} badge`}>
                        <Link href="/notifications"><Bell/></Link>
                        <div className={styles.actionIconBadge}>3</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
