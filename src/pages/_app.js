import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { isBrowser, isWorkboxActive } from '../utils/pwaUtils';

import 'react-day-picker/lib/style.css';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;

