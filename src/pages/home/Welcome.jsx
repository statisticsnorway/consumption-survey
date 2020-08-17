import React from 'react';
import { Link } from 'react-router-dom';
import useCustomElement from 'use-custom-element';
import { Share } from 'react-feather';
import { isIOS, isSafari } from 'react-device-detect';
import PwaInstallPopupIOS from 'react-pwa-install-ios';
import '@pwabuilder/pwainstall';

import './home.scss';

const appIconPath = `${window.location.origin}/ssb-96x96.jpg`;

const Welcome = props => {
    const [customElementProps, ref] = useCustomElement(props);

    const iosShim = isIOS || isSafari;
    console.log('iconPath', appIconPath);

    return (
        <div className="welcome">
            <span className="welcomeText"> Takk for at du er med oss i</span>
            <span className="welcomeText"
                  style={{fontSize: '1.25rem'}}> <b>Forbruksundersøkelsen 2021</b>! </span>
            <p/>
            {iosShim && <PwaInstallPopupIOS delay={1} force>
                <div className="iosShim arrow-box">
                    <img src={appIconPath} className="logo"/>
                    <span>Click on</span>
                    <Share style={{ margin: '0 0.5rem', color: '#3396D2' }}/>
                    <span>and <b>Add to Home Screen</b></span>
                </div>
            </PwaInstallPopupIOS>}
            {!iosShim &&
            <>
                <span> Trykk på knappen under </span>
                <span> for å installere appen: </span>
                <br/>
                <pwa-install {...customElementProps} ref={ref}/>
                <br/>
                <span> eller fortsett med <Link to="/dashboard">web versjon</Link></span>
            </>
            }
        </div>
    );
};

export default Welcome;
