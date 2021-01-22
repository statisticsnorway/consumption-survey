import { ReactNode } from 'react';

import styles from './modal.module.scss';
import warning from 'tiny-warning';

export type  DeleteConfirmDialogProps = {
    show: boolean;
    leadingText: string;
    info?: string;
    warningText: string;
    className?: string;
    style?: object;
    onCancel: () => void;
    onConfirm: () => void;
    cancelText: string;
    confirmText: string;
};

const DeleteConfirmDialog = ({
                                 show,
                                 leadingText,
                                 info,
                                 warningText,
                                 className,
                                 style,
                                 onCancel, cancelText,
                                 onConfirm, confirmText
                             }: DeleteConfirmDialogProps) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.fbuModalOverlay} style={style}>
            <div className={`${styles.fbuModalDialog} ${className || ''}`}>
                <span className={styles.fbuDeleteConfirmLeadingText}>{leadingText} {!info && '?'}</span>
                {info && <span className={styles.fbuDeleteConfirmInfo}>{info} <span style={{ color: '#000' }}>?</span></span>}
                {warningText && <span className={styles.fbuDeleteConfirmWarning}>{warningText}</span>}

                <div className={`${styles.fbuModalFooter} ${styles.fbuDeleteConfirmFooter}`}>
                    <button
                        onClick={onCancel}
                        className={`ssb-btn secondary-btn ${styles.fbuModalActionButton} ${styles.fbuDeleteConfirmCancelButton}`}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`ssb-btn secondary-btn ${styles.fbuModalActionButton} ${styles.fbuDeleteConfirmCloseButton}`}
                        onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmDialog;
