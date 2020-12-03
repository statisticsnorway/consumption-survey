import styles from './modal.module.scss';

export interface ModalProps {
    show: boolean;
    onClose: () => void;
    closeText: string;
    onCancel: () => void;
    cancelText: string;
    className?: string;
    style?: object;
};

const Modal: React.FC<ModalProps> = ({
                                         show, children, onClose, closeText, onCancel, cancelText,
                                         className = '', style = {}
                                     }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.fbuModalOverlay} style={style}>
            <div className={`${styles.fbuModalDialog} ${className || ''}`}>
                {children}

                <div className={styles.fbuModalFooter}>
                    <a
                        onClick={onCancel}
                        className={`${styles.fbuModalActionButton} ${styles.fbuModalCancelButton}`}
                    >
                        {cancelText}
                    </a>
                    <button className={`ssb-btn primary-btn ${styles.fbuModalActionButton} ${styles.fbuModalCloseButton}`} onClick={onClose}>
                        {closeText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
