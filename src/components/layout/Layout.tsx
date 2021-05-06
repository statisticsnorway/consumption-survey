import Header from './header/Header';
import Workspace from './workspace/Workspace';

import styles from './layout.module.scss';
import { ReactElement, ReactNode, ReactNodeArray } from 'react';

export type LayoutProps = {
    children?: ReactNode | ReactNodeArray | ReactElement;
};

const Layout = ({}: LayoutProps) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerZone}>
                <Header/>
            </div>
            <div className={styles.workspaceZone}>
                <Workspace/>
            </div>
        </div>
    );
};

export default Layout;
