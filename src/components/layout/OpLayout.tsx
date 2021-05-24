import { ReactNode, ReactNodeArray } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'react-feather';
import useServiceWorkerHelper from '../../hocs/useServiceWorkerHelper';
import { LayoutContext } from '../../uiContexts';
import Header from './header/Header';

import styles from './layout.module.scss';

export type OpLayoutProps = {
    showAppHeader?: boolean;
    children?: ReactNode | ReactNodeArray | null;
};

const OpLayout = ({showAppHeader = false, children}: OpLayoutProps) => {
    const {showUpdateSnackbar} = useServiceWorkerHelper();

    return (
        <LayoutContext.Provider value={{showUpdateSnackbar}}>
            <div className={styles.mainContainer}>
                {showAppHeader && <Header/>}
                {children}
            </div>
        </LayoutContext.Provider>
    );
};

export default OpLayout;
