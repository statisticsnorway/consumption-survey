import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
// TODO: remove isSafari once this is tested
import { isIOS, isMobileSafari, isSafari, isAndroid, isChrome } from 'react-device-detect';
// TODO: see if we can do away with one of react-pwa-install or react-pwa-install-ios
import PwaInstallPopupIOS from 'react-pwa-install-ios';
import useCustomElement from 'use-custom-element';
import '@pwabuilder/pwainstall';
import { Share } from 'react-feather';
import Dashboard from '../../pages/dashboard/Dashboard';
import { WorkspacePanel } from '../layout/Workspace';
import GoToApp from '../pwa/GoToApp';
import { isPWA } from '../../utils/pwaUtils';
import { AppContext } from '../../uiContexts';
import Auth from '../auth/Auth';

import styles from './welcome.module.scss';
import Loader from '../common/Loader';

const appIconPath = () => `${window.location.origin}/icons/maskable_icon-96x96.png`;

const WelcomeIOS = () => {
    const {firstVisitWeb} = useContext(AppContext)
    if (firstVisitWeb) {
        return (
            <>
                <WorkspacePanel>
                    <p>Se popup nede ...</p>
                </WorkspacePanel>
                <PwaInstallPopupIOS delay={1} force>
                    <div className={`${styles.iosShim} ${styles.arrowBox}`}>
                        <img src={appIconPath()} className="logo"/>
                        <span>Click on --- </span>
                        <Share style={{margin: '0 0.5rem', color: '#3396D2'}}/>
                        <span>and <b>Add to Home Screen</b></span>
                    </div>
                </PwaInstallPopupIOS>
            </>
        );
    } else {
        return <GoToApp/>;
    }
};

const WelcomeAndroid = () => {
    const {firstVisitWeb} = useContext(AppContext);
    const [customElementProps, ref] = useCustomElement({});

    if (firstVisitWeb) {
        // @ts-ignore
        const installComp = <pwa-install {...customElementProps} ref={ref}/>;
        return (
            <WorkspacePanel>
                <span> Trykk på knappen under </span>
                <span> for å installere appen : </span>
                <br/>
                {installComp}
            </WorkspacePanel>
        );
    } else {
        return <GoToApp/>;
    }
};

const Welcome = () => {
    const appGlobals = useContext(AppContext);
    const router = useRouter();

    console.log('From cache: ', appGlobals);

    if (!isPWA()) {
        if (appGlobals.pwaActivated) {
            return <GoToApp/>;
        } else {
            // TODO: remove isSafari() check once this is tested
            return (
                <>
                    {((isIOS && isMobileSafari) || isSafari) && <WelcomeIOS/>}
                    {isAndroid && isChrome && <WelcomeAndroid/>}
                    {(!(isAndroid || isIOS)) && isChrome &&
                    <Dashboard/>
                    }
                </>
            );
        }
    } else {
        return (
            <Dashboard/>
        );
    }
};

export default Welcome;
