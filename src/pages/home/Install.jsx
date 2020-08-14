import React from 'react';
import useCustomElement from 'use-custom-element';
import { osName } from 'react-device-detect';
import Dashboard from '../dashboard/Dashboard';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import PurchaseDetail from '../purchases/PurchaseDetail';

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

const Welcome = props => {
    const [customElementProps, ref] = useCustomElement(props);

    const mode = ['standalone', 'minimal-ui']
        .find(mode => window.matchMedia(`(display-mode: ${mode})`).matches ? mode : 'xx')

    const stdType = typeof window.navigator.standalone;

    return (
        <div className="welcome">
            <span className="welcomeText"> Takk for at du er med oss i</span>
            <span className="welcomeText"
                  style={{fontSize: '1.25rem'}}> <b>Forbruksundersøkelsen 2021</b>! </span>
            <p/>
            <span> Trykk på knappen under </span>
            <span> for å installere appen: </span>
            <br/>
            <pwa-install {...customElementProps} ref={ref}/>
            <br/>
            <span> eller fortsett med <Link to="/dashboard">web versjon</Link></span>
        </div>
    );
}

const Install = props => {
    return (
        <div className="homeScreen">
            {isPWA()
                ? <Dashboard/>
                : (
                    <BrowserRouter>
                        <Switch>
                            <Route path="/dashboard">
                                <Dashboard />
                            </Route>
                            <Route path="/purchases">
                                <PurchaseDetail />
                            </Route>
                            <Route path="/">
                                <Welcome {...props} />
                            </Route>
                        </Switch>
                    </BrowserRouter>
                )
            }
        </div>
    );
};

export default Install;
