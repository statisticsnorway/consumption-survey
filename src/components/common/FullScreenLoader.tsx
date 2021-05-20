import { ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import Modal from './dialog/Modal';

import styles from './loaders.module.scss';
import Loader from './Loader';

export type FullscreenLoaderProps = {
    show: boolean;
    loaderMessage?: string;
    onClose?: () => void;
    className?: string;
    children?: ReactNode | ReactNodeArray | null;
};

const FullscreenLoader = ({show, loaderMessage = '', onClose, className = '', children = null}: FullscreenLoaderProps) => {
    const [flpShow, setFlpShow] = useState<boolean>(show);

    useEffect(() => {
        setFlpShow(show);
    }, [show]);

    const flpClose = onClose ? onClose : () => {
        setFlpShow(false);
    }

    return (
        <Modal
            show={flpShow}
            showTitle={false}
            onClose={flpClose}
            showClose={false}
            showCancel={false}
            className={styles.fullscreenLoader}
        >
            <span className={styles.loaderMessage}>
                {loaderMessage}...
            </span>
            <Loader/>
            {children}
        </Modal>
    );
};

export default FullscreenLoader;
