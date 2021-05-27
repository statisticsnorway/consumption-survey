import { ReactElement, ReactNode, ReactNodeArray, useState } from 'react';
import useServiceWorkerHelper from '../../hocs/useServiceWorkerHelper';
import Header from './header/Header';
import { LayoutContext } from '../../uiContexts';

import styles from './layout.module.scss';
import FullscreenLoader from '../common/FullScreenLoader';

export type LayoutProps = {
    children?: ReactNode | ReactNodeArray | ReactElement;
};

const FULL_SCREEN_INIT_STATE = {
    show: false,
    msg: '',
};

const Layout = ({children}: LayoutProps) => {
    const {showUpdateSnackbar} = useServiceWorkerHelper();
    const [fullScreenLoaderState, setFullScreenLoaderState] = useState(FULL_SCREEN_INIT_STATE);

    const showMessage = async (msg) => {
        setFullScreenLoaderState({ show: true, msg });
    };

    const clearMessages = async () => {
        setFullScreenLoaderState({ show: false, msg: ''});
    };

    const contextValues = {
        showUpdateSnackbar,
        showMessage, clearMessages,
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
