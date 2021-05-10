import { ReactElement, ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import layoutStyles from '../layout.module.scss';
import styles from './workspace.module.scss';
import DefaultNavBar from '../DefaultNavBar';
import Footer from '../footer/Footer';
import { useTranslation } from 'react-i18next';
import { isBrowser } from '../../../utils/pwaUtils';
import SWHelper from '../../pwa/SWHelper';

export type WorkspaceProps = {
    children?: ReactNode | ReactNodeArray | ReactElement;
    showFooter?: boolean;
    footerComp?: ReactNode | ReactNodeArray | ReactElement;
    stickyFooter?: boolean;
};

const Workspace = ({children, showFooter = true, footerComp, stickyFooter = true}: WorkspaceProps) => {
    const router = useRouter();
    const [isOnline, setIsOnline] = useState<boolean>(false);

    useEffect(() => {
        if (isBrowser() && ('ononline' in window) && ('onoffline' in window)) {
            setIsOnline(window.navigator.onLine);

            if (!window.ononline) {
                window.addEventListener('online', () => {
                    setIsOnline(true);
                });
            }

            if (!window.onoffline) {
                window.addEventListener('offline', () => {
                    setIsOnline(false);
                });
            }
        }
    }, []);

    return (
        <>
            <div className={layoutStyles.workspaceZone}>
                <div className={styles.workspace}>
                    <SWHelper isOnline={isOnline}/>
                    {children}
                    {router.pathname}
                </div>
            </div>
            {showFooter &&
            <div className={`${layoutStyles.footerZone}`}>
                <Footer footerComp={footerComp || <DefaultNavBar/>} sticky={stickyFooter}/>
            </div>
            }
        </>
    );
};

export default Workspace;
