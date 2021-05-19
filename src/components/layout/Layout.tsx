import { ReactElement, ReactNode, ReactNodeArray } from 'react';
import useServiceWorkerHelper from '../../hocs/useServiceWorkerHelper';
import Header from './header/Header';
import { LayoutContext } from '../../uiContexts';

import styles from './layout.module.scss';

export type LayoutProps = {
    children?: ReactNode | ReactNodeArray | ReactElement;
};

const Layout = ({children}: LayoutProps) => {
    const {showUpdateSnackbar} = useServiceWorkerHelper();
    return (
        <LayoutContext.Provider value={{showUpdateSnackbar}}>
            <div className={styles.mainContainer}>
                <Header/>
                {children}
            </div>
        </LayoutContext.Provider>
    );
};

export default Layout;
