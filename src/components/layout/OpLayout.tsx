import { ReactNode, ReactNodeArray, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'react-feather';
import useServiceWorkerHelper from '../../hocs/useServiceWorkerHelper';
import { LayoutContext } from '../../uiContexts';
import Header from './header/Header';

import styles from './layout.module.scss';
import FullscreenLoader from '../common/FullScreenLoader';
import { MessagePanelType } from '../common/blocks/MessagePanel';

export type OpLayoutProps = {
    showAppHeader?: boolean;
    children?: ReactNode | ReactNodeArray | null;
};

const FULL_SCREEN_INIT_STATE = {
    show: false,
    msg: '',
};

const MESSAGE_PANEL_INIT_STATE = {
    show: false,
    type: MessagePanelType.NONE,
    msg: '',
    autoDisappear: true,
};


/**
 * TODO: DRY: eliminate duplication here
 */
const OpLayout = ({showAppHeader = false, children}: OpLayoutProps) => {
    const {showUpdateSnackbar} = useServiceWorkerHelper();
    const [fullScreenLoaderState, setFullScreenLoaderState] = useState(FULL_SCREEN_INIT_STATE);
    const [msgPanelState, setMsgPanelState] = useState(MESSAGE_PANEL_INIT_STATE);

    const showMessage = async (msg) => {
        setFullScreenLoaderState({ show: true, msg });
    };

    const clearMessages = async () => {
        setFullScreenLoaderState({ show: false, msg: ''});
    };

    const showMessagePanel = async (type, msg, autoDisappear = true) => {
        setMsgPanelState({
            show: true,
            type,
            msg,
            autoDisappear
        });
    };

    const hideMessagePanel = async () => {
        setMsgPanelState(MESSAGE_PANEL_INIT_STATE);
    };

    const contextValues = {
        showUpdateSnackbar,
        showMessage, clearMessages,
        messagePanelVisible: msgPanelState.show,
        messagePanelType: msgPanelState.type,
        messagePanelMsg: msgPanelState.msg,
        messagePanelAutoDisappear: msgPanelState.autoDisappear,
        showMessagePanel, hideMessagePanel,
    };

    return (
        <LayoutContext.Provider value={contextValues}>
            <div className={styles.mainContainer}>
                {showAppHeader && <Header/>}
                {children}
            </div>
            <FullscreenLoader show={fullScreenLoaderState.show} loaderMessage={fullScreenLoaderState.msg} />
        </LayoutContext.Provider>
    );
};

export default OpLayout;
