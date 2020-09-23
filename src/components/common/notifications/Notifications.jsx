import Link from 'next/link';
import { Bell, CloudOff } from 'react-feather';
import styles from './notifications.module.scss';

const Notifications = ({ isOnline, showBadge = false, badgeContent = '' }) => {
    return <div className={styles.actionIcons}>
        <a className={`${styles.actionIcon} badge ${isOnline ? '' : styles.offline}`}>
            <Link href="/notifications">{isOnline ? <Bell /> : <CloudOff />}</Link>

            {showBadge && badgeContent &&
                <div className={styles.actionIconBadge}>{badgeContent}</div>
            }
        </a>
    </div>
}

export default Notifications;
