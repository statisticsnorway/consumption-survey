import styles from './modal.module.scss';

export interface ModalProps {
    show: boolean;
    onClose: () => void;
    closeText: string;
    styleClass?: string;
    style?: object;
};

const Modal: React.FC<ModalProps> = ({
                                         show, children, onClose, closeText,
                                         styleClass = '', style = {}
                                     }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={`${styles.fbuModalOverlay} ${styleClass || ''}`} style={style}>
            <div className={styles.fbuModalDialog}>
                {children}

                <div className={styles.fbuModalFooter}>
                    <button className={styles.fbuModalCloseButton} onClick={onClose}>
                        {closeText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
