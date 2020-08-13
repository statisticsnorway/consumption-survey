import React from 'react';
import useCustomElement from 'use-custom-element';
import { osName } from 'react-device-detect';

import './home.scss';

import '@pwabuilder/pwainstall'

const logoUrl = (logoName) => `/${logoName}.png`;

const getPlatformLogo = () => {
    switch(osName) {
        case 'iOS': return logoUrl('apple');
        case 'Android':
        default:
            return logoUrl('android');
    }
}

const Install = props => {
    const [customElementProps, ref] = useCustomElement(props);

    return (
        <div className="welcome">
            <p> Takk for at du er med oss i <b>Forbruksundersøkelsen 2021</b>! </p>
            <p> Trykk på knappen under for å installere appen: </p>
            <pwa-install {...customElementProps} ref={ref} />
        </div>
    );
};

export default Install;
