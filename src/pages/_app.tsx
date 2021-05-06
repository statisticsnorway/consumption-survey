import App from 'next/app';
import getConfig from 'next/config';
import { appWithTranslation } from '../../i18n';
import { sanitizeConfig, loadFromEnvVars } from '../utils/cfgUtils';
import { useTranslation } from 'react-i18next';

import '../styles/globals.scss'

const appConfig = getConfig();

const MyApp = ({Component, pageProps}) => {
    const {envVars} = appConfig.publicRuntimeConfig;
    const {i18n} = useTranslation('welcome');

    const getCfg = () => {
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

    try {
        return (
            <>
                <Component {...pageProps} />
            </>
        );
    } catch (err) {
        console.log('Error while rendering app', err);
        return <>{JSON.stringify(err)}</>;
    }
};

// initial props required only for publicRuntimeEnvironment
MyApp.getInitialProps = async (ctx) => ({...await App.getInitialProps(ctx)});

export default appWithTranslation(MyApp/* , nextI18NextConfig*/);
