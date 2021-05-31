import { ReactElement, ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import useServiceWorkerHelper from '../../hocs/useServiceWorkerHelper';
import Header from './header/Header';
import { LayoutContext } from '../../uiContexts';

import styles from './layout.module.scss';
import FullscreenLoader from '../common/FullScreenLoader';
import { MessagePanelType } from '../common/blocks/MessagePanel';

export type LayoutProps = {
    children?: ReactNode | ReactNodeArray | ReactElement;
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
    onComplete: undefined,
};

const Layout = ({children}: LayoutProps) => {
    const {showUpdateSnackbar} = useServiceWorkerHelper();
    const [fullScreenLoaderState, setFullScreenLoaderState] = useState(FULL_SCREEN_INIT_STATE);
    const [msgPanelState, setMsgPanelState] = useState(MESSAGE_PANEL_INIT_STATE);

    const showMessage = async (msg) => {
        setFullScreenLoaderState({ show: true, msg });
    };

    const clearMessages = async () => {
        setFullScreenLoaderState(FULL_SCREEN_INIT_STATE);
    };

    const showMessagePanel = async (type, msg, autoDisappear = true, onComplete = undefined) => {
        setMsgPanelState({
            show: true,
            type,
            msg,
            autoDisappear,
            onComplete,
        });
    };

    useEffect(() => {
        console.log('[MessagePanel] new state', msgPanelState);
    }, [msgPanelState]);

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
        messageOnComplete: msgPanelState.onComplete,
        showMessagePanel, hideMessagePanel,
    };

    return (
        <LayoutContext.Provider value={contextValues}>
            <div className={styles.mainContainer}>
                <Header/>
                {children}
            </div>
            <FullscreenLoader show={fullScreenLoaderState.show} loaderMessage={fullScreenLoaderState.msg} />
        </LayoutContext.Provider>
    );
};

export default Layout;
