import App from 'next/app';
import getConfig from 'next/config';
import { appWithTranslation } from '../../i18n';
import { sanitizeConfig, loadFromEnvVars } from '../utils/cfgUtils';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';

import '../styles/globals.scss'
import { useEffect, useState } from 'react';
import FireProvider from '../firebase/FireProvider';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import UserProvider from '../firebase/UserProvider';

const appConfig = getConfig();
const getCfg = () => {
    const {envVars} = appConfig.publicRuntimeConfig;
    if (envVars.NEXT_PUBLIC_FIREBASE_CONFIG_JSON) {
        // config available as json object
        const cfg = JSON.parse(envVars.NEXT_PUBLIC_FIREBASE_CONFIG_JSON);
        console.log('found config (json)', sanitizeConfig(cfg));
        return cfg;
    } else {
        const cfg = loadFromEnvVars(envVars, 'NEXT_PUBLIC_FB_LOCAL_');
        console.log('locale config (vars)', sanitizeConfig(cfg));
        return cfg;
    }
};

const MyApp = ({Component, pageProps}) => {
    const {i18n} = useTranslation('welcome');
    const [firebaseConfig, setFirebaseConfig] = useState<object>();

    useEffect(() => {
        setFirebaseConfig(getCfg());
    }, []);


    try {
        return (
            <FireProvider config={firebaseConfig}>
                <UserProvider>
                    <Layout>
                        <ProtectedRoute>
                            <Component {...pageProps} />
                        </ProtectedRoute>
                    </Layout>
                </UserProvider>
            </FireProvider>
        );
    } catch (err) {
        console.log('Error while rendering app', err);
        return <>{JSON.stringify(err)}</>;
    }
};

// initial props required only for publicRuntimeEnvironment
MyApp.getInitialProps = async (ctx) => ({...await App.getInitialProps(ctx)});

export default appWithTranslation(MyApp/* , nextI18NextConfig*/);
