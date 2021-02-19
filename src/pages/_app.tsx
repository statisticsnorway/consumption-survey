import { createContext } from 'react'
import App, { AppProps } from 'next/app'
import getConfig from 'next/config';
import Layout from '../components/layout/Layout'
import { isPWA } from '../utils/pwaUtils'
import { getFromCache, saveToCache } from '../hocs/swCache'
import { appWithTranslation } from '../../i18n'
import { AppContext, AppContextType } from '../uiContexts';
import FireProvider from '../firebase/FireProvider';
import UserProvider from '../firebase/UserProvider';

import '../styles/globals.scss'
import 'react-day-picker/lib/style.css'
import 'rc-time-picker/assets/index.css'
import PurchasesProvider from '../firebase/PurchasesProvider';
import ExpensesProvider from '../firebase/ExpensesProvider';
import PouchDBProvider from '../pouchdb/PouchDBProvider';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { loadFromEnvVars, sanitizeConfig } from '../utils/cfgUtils';

const appConfig = getConfig();

class MyApp extends App {
    state = {
        firstVisitWeb: true,
        pwaActivated: false,

        initComplete: false,
    };

    static async getInitialProps(ctxt) {
        console.log('--------------------------------------');
        console.log('Environment Variables (_app)', appConfig);
        console.log('--------------------------------------');



        return {
            ...(await App.getInitialProps(ctxt)),
        }
    }

    componentDidMount(): void {
        this.pickupFromCache();

        this.setState(prevState => {
            this.setState({
                ...prevState,
                envVars: appConfig,
            });
        });
    }

    pickupFromCache = async () => {
        const firstVisitWebFlag = !(await getFromCache('firstVisitWeb'))
        const firstVisitWeb = Boolean(firstVisitWebFlag)

        if (firstVisitWeb) {
            await saveToCache('firstVisitWeb', 'false')
        }

        const pwaActivatedFlag = isPWA()
            ? await saveToCache('pwaActivated', 'true')
            : false;

        const pwaActivated = Boolean(pwaActivatedFlag)

        const newState = {firstVisitWeb, pwaActivated}
        console.log(`${new Date()} : setState called with `, newState)
        this.setState(newState)
    };

    /*
    const corr = (
        <AppContext.Provider value={{ envVars: appConfig }}>
            <FireProvider>
                <UserProvider>
                    <ProtectedRoute>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ProtectedRoute>
                </UserProvider>
            </FireProvider>
        </AppContext.Provider>
    );
    */

    render() {
        const {Component, pageProps, router} = this.props;

        const {envVars} = appConfig.publicRuntimeConfig;

        // !! NextJS FACE-PALM !!
        const getCfg = () => {
            if (envVars.NEXT_PUBLIC_FIREBASE_CONFIG_JSON) {
                // config available as json object
                const cfg = JSON.parse(envVars.NEXT_PUBLIC_FIREBASE_CONFIG_JSON);
                console.log('found config (json)', sanitizeConfig(cfg));
                return cfg;
            } else {
                const cfg = loadFromEnvVars(envVars, 'NEXT_PUBLIC_FB_LOCAL_');
                console.log('config (vars)', sanitizeConfig(cfg));
                return cfg;
            }
        };

        return (
            <AppContext.Provider value={{envVars: appConfig}}>
                <FireProvider config={getCfg()}>
                    <PouchDBProvider dbName="receipts">
                        <UserProvider>
                            <PurchasesProvider>
                                <ExpensesProvider>
                                    <Layout>
                                        <ProtectedRoute>
                                            <Component {...pageProps} />
                                        </ProtectedRoute>
                                    </Layout>
                                </ExpensesProvider>
                            </PurchasesProvider>
                        </UserProvider>
                    </PouchDBProvider>
                </FireProvider>
            </AppContext.Provider>
        );
    }
}

/*
const MyApp = ({Component, pageProps}) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};
*/

export default appWithTranslation(MyApp);
