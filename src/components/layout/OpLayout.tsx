import { ReactNode, ReactNodeArray, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'react-feather';
import useServiceWorkerHelper from '../../hocs/useServiceWorkerHelper';
import { LayoutContext } from '../../uiContexts';
import Header from './header/Header';

import styles from './layout.module.scss';
import FullscreenLoader from '../common/FullScreenLoader';

export type OpLayoutProps = {
    showAppHeader?: boolean;
    children?: ReactNode | ReactNodeArray | null;
};

const FULL_SCREEN_INIT_STATE = {
    show: false,
    msg: '',
};

/**
 * TODO: DRY: eliminate duplication here
 */
const OpLayout = ({showAppHeader = false, children}: OpLayoutProps) => {
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
                {showAppHeader && <Header/>}
                {children}
            </div>
            <FullscreenLoader show={fullScreenLoaderState.show} loaderMessage={fullScreenLoaderState.msg} />
        </LayoutContext.Provider>
    );
};

export default OpLayout;
