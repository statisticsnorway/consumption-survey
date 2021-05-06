import Header from './header/Header';
import Workspace from './workspace/Workspace';

import styles from './layout.module.scss';
import Footer from './footer/Footer';
import { ReactElement, ReactNode, ReactNodeArray } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const DEFAULT_NAV_ITEMS = [
    {
        id: 'home',
        path: '/home',
    }, {
        id: 'consumption',
        path: '/consumption',
    }, {
        id: 'tasks',
        path: '/tasks',
    },
];

export type LayoutWithFooterProps = {
    footerComp?: ReactNode | ReactNodeArray | ReactElement;
    children?: ReactNode | ReactNodeArray | ReactElement;
};

const LayoutWithFooter = ({footerComp}: LayoutWithFooterProps) => {
    const {t} = useTranslation('navbar');
    const router = useRouter();

    const makeDefaultNavItems = () => DEFAULT_NAV_ITEMS.map(item => ({
        id: item.id,
        title: t(item.id),
        onClick: () => { router.push(item.path); }
    }));

    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerZone}>
                <Header/>
            </div>
            <div className={styles.workspaceZone}>
                <Workspace/>
            </div>
            {footerComp ||
             <div className={styles.footerZone}>
                 <Footer navItems={makeDefaultNavItems()}/>
             </div>
            }
        </div>
    );
};

export default LayoutWithFooter;
