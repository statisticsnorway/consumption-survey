import Header from './header/Header';

import styles from './layout.module.scss';
import { ReactElement, ReactNode, ReactNodeArray, useEffect, useState } from 'react';

export type LayoutProps = {
    children?: ReactNode | ReactNodeArray | ReactElement;
};

const Layout = ({children}: LayoutProps) => {
    return (
        <div className={styles.mainContainer}>
            <Header/>
            {children}
        </div>
    );
};

export default Layout;
