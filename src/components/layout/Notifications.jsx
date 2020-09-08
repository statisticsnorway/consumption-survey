import Link from 'next/link';
import { Bell } from 'react-feather';
import styles from './styles/notifications.module.scss';

const Notifications = ({ showBadge = false, badgeContent = '' }) => {
    return <div className={styles.actionIcons}>
        <a className={`${styles.actionIcon} badge`}>
            <Link href="/notifications"><Bell /></Link>
            {showBadge ? <div className={styles.actionIconBadge}>{badgeContent}</div> : null}
        </a>
    </div>
}

export default Notifications;