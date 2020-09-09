import { createContext, useContext } from 'react';
// TODO: remove isSafari once this is tested
import { isMobile, isIOS, isMobileSafari, isSafari, isAndroid, isChrome } from 'react-device-detect';
// TODO: see if we can do away with one of react-pwa-install or react-pwa-install-ios
import PwaInstallPopupIOS from 'react-pwa-install-ios';
import useCustomElement from 'use-custom-element';
import '@pwabuilder/pwainstall';
import { Share } from 'react-feather';
import { WelcomeContextProps } from '../types/react';
import { useLocalStorage } from '../hocs/localStorage';
import Dashboard from '../pages/dashboard/Dashboard';
import { WorkspacePanel } from './layout/Workspace';
import { isPWA } from '../utils/pwaUtils';

import styles from './welcome.module.scss';

const WelcomeContext = createContext({} as WelcomeContextProps);

const appIconPath = () => `${window.location.origin}/icons/maskable_icon-96x96.png`;

const WelcomeIOS = () => {
    const {showInstallPrompt} = useContext(WelcomeContext);
    if (showInstallPrompt) {
        return (
            <PwaInstallPopupIOS delay={1} force>
                <div className={`${styles.iosShim} ${styles.arrowBox}`}>
                    <img src={appIconPath()} className="logo"/>
                    <span>Click on --- </span>
                    <Share style={{margin: '0 0.5rem', color: '#3396D2'}}/>
                    <span>and <b>Add to Home Screen</b></span>
                </div>
            </PwaInstallPopupIOS>
        );
    } else {
        return <p>safari none</p>;
    }
};

const WelcomeAndroid = () => {
    const {showInstallPrompt, setShowInstallPrompt, setUseWebVersion} = useContext(WelcomeContext);
    const [customElementProps, ref] = useCustomElement({});

    if (showInstallPrompt) {
        // @ts-ignore
        const installComp = <pwa-install {...customElementProps} ref={ref}/>;
        return (
            <WorkspacePanel>
                <span> Trykk på knappen under </span>
                <span> for å installere appen: </span>
                <br/>
                {installComp}
            </WorkspacePanel>
        );
    } else {
        return <p>Android none</p>;
    }
};

const Welcome = () => {
    const [showInstallPrompt, setShowInstallPrompt] = useLocalStorage('showInstallPrompt', 'true');
    const [useWebVersion, setUseWebVersion] = useLocalStorage('useWebVersion');

    console.log('Welcome showInstall:', showInstallPrompt, ' useWeb: ', useWebVersion);

    const pwaCtxtOptions = {
        showInstallPrompt,
        setShowInstallPrompt,
        useWebVersion,
        setUseWebVersion
    };


    // TODO: remove isSafari() check once this is tested
    return isPWA() ?
        <Dashboard /> :
        (
            <>
                <WelcomeContext.Provider value={pwaCtxtOptions}>
                    {((isIOS && isMobileSafari) || isSafari) && <WelcomeIOS/>}
                    {isAndroid && isChrome && <WelcomeAndroid/>}
                    {(!(isAndroid || isIOS)) && isChrome && <Dashboard/>}
                </WelcomeContext.Provider>
            </>
        );
};

export default Welcome;
