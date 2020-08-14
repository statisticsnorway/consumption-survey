import React from 'react';
import Welcome from './Welcome';
import { isPWA } from '../../utils/pwaUtils';

import './home.scss';

const showConfig = () => (
    <div>
        <p>{JSON.stringify(window.navigator)}</p>
        <p>{JSON.stringify(window.clientInformation)}</p>
        <p>{JSON.stringify(document.referrer)}</p>
    </div>
);

const Install = props => {
    return (
        <div className="homeScreen">
            {!isPWA() && <Welcome {...props} />}
        </div>
    );
};

export default Install;
