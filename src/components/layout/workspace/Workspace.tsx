import { ReactElement, ReactNode, ReactNodeArray, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultNavBar from '../DefaultNavBar';
import Footer from '../footer/Footer';
import { VersionUpdateSnackbar } from '../../common/dialog/Snackbar';

import layoutStyles from '../layout.module.scss';
import styles from './workspace.module.scss';
import { LayoutContext } from '../../../uiContexts';

export type WorkspaceProps = {
    children?: ReactNode | ReactNodeArray | ReactElement;
    showFooter?: boolean;
    headerComp?: ReactNode | ReactNodeArray | null;
    footerComp?: ReactNode | ReactNodeArray | ReactElement;
    stickyFooter?: boolean;
    styleClass?: string;
    style?: object;
};

const Workspace = ({
                       children,
                       showFooter = true,
                       headerComp,
                       footerComp,
                       stickyFooter = true,
                       style = {},
                       styleClass = '',
                   }: WorkspaceProps) => {
    const router = useRouter();
    const {showUpdateSnackbar} = useContext(LayoutContext);

    return (
        <>
            {headerComp}
            <div className={layoutStyles.workspaceZone}>
                <div className={`${styles.workspace} ${styleClass}`} style={style}>
                    <VersionUpdateSnackbar open={showUpdateSnackbar}/>
                    {children}
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
