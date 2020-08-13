import React from 'react';
import useCustomElement from 'use-custom-element';
import { osName } from 'react-device-detect';
import Dashboard from '../dashboard/Dashboard';

import '@pwabuilder/pwainstall'
import './home.scss';


const logoUrl = (logoName) => `/${logoName}.png`;

const getPlatformLogo = () => {
    switch (osName) {
        case 'iOS':
            return logoUrl('apple');
        case 'Android':
        default:
            return logoUrl('android');
    }
}

const isPWA = () =>
    window.navigator.standalone
        || window.matchMedia('(display-mode: standalone)').matches
        || document.referrer.includes('android-app://');

const Install = props => {
    const [customElementProps, ref] = useCustomElement(props);

    const mode = ['standalone', 'minimal-ui']
        .find(mode => window.matchMedia(`(display-mode: ${mode})`).matches ? mode : 'xx')

    const stdType = typeof window.navigator.standalone;

    return (
        <div className="homeScreen">
            {isPWA()
                ? <Dashboard />
                : (
                    <div className="welcome">
                        <span className="welcomeText"> Takk for at du er med oss i</span>
                        <span className="welcomeText"
                              style={{fontSize: '1.25rem'}}> <b>Forbruksundersøkelsen 2021</b>! </span>
                        <p/>
                        <span> Trykk på knappen under </span>
                        <span> for å installere appen: </span>
                        <br/>
                        <pwa-install {...customElementProps} ref={ref}/>
                    </div>
                )
            }
        </div>
    );
};

export default Install;
