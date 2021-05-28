import styles from './messagePanel.module.scss';
import FbuIcon, { IconName } from '../icons/FbuIcon';
import { useContext, useEffect } from 'react';
import { LayoutContext } from '../../../uiContexts';

export enum MessagePanelType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    NONE = 'none'
}

export type MessagePanelProps = {
    show: boolean;
    type: MessagePanelType;
    message: string;
    autoDisappear?: boolean;
    allowClose?: boolean;
};

export const getFbuIconName = (type: MessagePanelType): IconName => {
    switch (type) {
        case MessagePanelType.SUCCESS:
            return 'CheckCircle';
        case MessagePanelType.ERROR:
            return 'XCircle';
        case MessagePanelType.INFO:
            return 'Info';
        case MessagePanelType.WARN:
            return 'AlertTriangle';
        default:
            return null;
    }
};

export const getMessagePanelIcon = (type: MessagePanelType) =>
    <FbuIcon name={getFbuIconName(type)} size={32} className={styles.icon}/>;

const MessagePanel = ({show, type = MessagePanelType.SUCCESS, message, autoDisappear = true }: MessagePanelProps) => {
    const {hideMessagePanel} = useContext(LayoutContext);

    useEffect(() => {
        if (show && autoDisappear) {
            setTimeout(() => {
                hideMessagePanel();
            }, 1000);
        }
    }, [show]);

    return show ? (
        <div className={`${styles.messagePanel} messagePanel--${type}`}>
            {getMessagePanelIcon(type)}
            <span className={styles.msg}>{message}</span>
            {!autoDisappear && <span className={styles.action} onClick={hideMessagePanel}>Lukk</span>}
        </div>
    ) : null;
};

export default MessagePanel;
