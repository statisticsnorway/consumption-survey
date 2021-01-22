import { ReactNode, useEffect, useState } from 'react';
import { MoreHorizontal } from 'react-feather';

import styles from './actions.module.scss';

export type ActionItem = {
    text: string;
    onClick: () => void;
}

export type ActionsPopupProps = {
    actions: ActionItem[];
    icon?: ReactNode;
    showCancel?: boolean;
    cancelText?: string;
    className?: string;
};

const ActionsPopup = ({
                          icon = <MoreHorizontal width={20} height={20}/>,
                          actions,
                          showCancel = true,
                          cancelText = 'Avbryt',
                          className = '',
                      }: ActionsPopupProps) => {
    const [open, setOpen] = useState<boolean>();

    const togglePopup = () => {
        setOpen(!open);
    };


    return (
        <div className={`${styles.actionsRoot} ${className}`}>
            <a onClick={togglePopup}>{icon}</a>
            {open &&
            <div className={styles.actionsPopup}>
                {actions.map(action => (
                    <a className={styles.actionItem} onClick={action.onClick}>{action.text}</a>
                ))}
                {showCancel &&
                <div className={styles.actionsPopupFooter}>
                    <button className={`ssb-btn secondary-btn`} onClick={togglePopup}>
                        {cancelText}
                    </button>
                </div>
                }
            </div>
            }
        </div>
    );
};

export default ActionsPopup;
