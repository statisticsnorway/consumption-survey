import React from 'react';
import { isPWA } from '../../utils/pwaUtils';
import Welcome from './Welcome';
import Dashboard from '../dashboard/Dashboard';

import './home.scss';

const Home = (props) => (
    <div className="homeScreen">
        {!isPWA() ? <Welcome {...props} /> : <Dashboard />}
    </div>
);

export default Home;

