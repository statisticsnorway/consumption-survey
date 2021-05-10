import { useState } from 'react';
import Loader from '../Loader';

import styles from './modal.module.scss';

const Snackbar = ({open, message, onClick, actionText}) => {
    return open ? (
        <div className={styles.snackbar}>
            {message}
            {(typeof onClick === 'function') &&
            <a href="#" onClick={onClick}>
                {actionText}
            </a>}
        </div>
    ) : null;
};

export const VersionUpdateSnackbar = ({open}) => {
    const [showLoading, setShowLoading] = useState(false);
    const onClick = () => {
        setShowLoading(true);
        window.location.reload();
    };

    const msgComponent = showLoading ?
        <Loader /> :
        <span>A new version is available!</span>

    return open ? (
        <Snackbar
            open={open}
            onClick={showLoading ? null : onClick}
            message={msgComponent}
            actionText="UPDATE"
        />
    ) : null;
};

export default Snackbar;
