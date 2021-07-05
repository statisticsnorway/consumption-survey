import App from 'next/app';
import getConfig from 'next/config';
import { appWithTranslation } from '../../i18n';
import { sanitizeConfig, loadFromEnvVars } from '../utils/cfgUtils';
import Layout from '../components/layout/Layout';

import '../styles/globals.scss'
import '../styles/QuestionnaireApp.css'
import { useEffect, useState } from 'react';
import FireProvider from '../firebase/FireProvider';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import UserProvider from '../firebase/Neo';
import Loader from '../components/common/Loader';
import PurchasesProvider from '../firebase/PurchasesProvider';
import { applyMiddleware, createStore, Store } from 'redux';
import reducer, { QuestionState } from '../store/reducers/questionReducer';
import { DispatchType, QuestionAction } from '../store/actionCreators';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import SearchTermsProvider from '../firebase/SearchTermsProvider';
import ExpensesProvider from '../firebase/ExpensesProvider';
import { AppContextStatus, AppContextType, AppContext } from '../uiContexts';

import dynamic from 'next/dynamic';
import QuestionnaireProvider from '../firebase/QuestionnaireProvider';

const LogProvider = dynamic(
    () => import('../utils/LogProvider'),
    {ssr: false}
);

const store: Store<QuestionState, QuestionAction> & {
    dispatch: DispatchType
} = createStore(reducer,
    applyMiddleware(thunk)
);

const appConfig = getConfig();
const getCfg = () => {
    const {envVars} = appConfig.publicRuntimeConfig;
    console.log('envVars', envVars);
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

export const APP_META_KEYS = {
    ONBOARDING: 'onboarding',
    CONSENT: 'consent',
    INSTALL: 'installation',
};

export const INIT_APP_META = {
    onboarding: AppContextStatus.INIT,
    consent: AppContextStatus.INIT,
    installation: AppContextStatus.INIT,
};

const getLocalStorageItems = (keys) =>
    keys.reduce((acc, key) => {
        const value = localStorage.getItem(key);
        return (value) ? {
            ...acc,
            [key]: value,
        } : acc;
    }, {});


const MyApp = ({Component, pageProps}) => {
    const [firebaseConfig, setFirebaseConfig] = useState<object>(null);
    const [appMeta, setAppMeta] = useState<AppContextType>(INIT_APP_META);

    const getLayout = Component.getLayout || (comp => <Layout>{comp}</Layout>);

    useEffect(() => {
        setFirebaseConfig(getCfg());
        setAppMeta(getLocalStorageItems(Object.keys(APP_META_KEYS)));
    }, []);

    try {
        return firebaseConfig ? (
            <AppContext.Provider value={appMeta}>
                <LogProvider>
                    <FireProvider config={firebaseConfig}>
                        <Provider store={store}>
                            <UserProvider>
                                <SearchTermsProvider>
                                    <PurchasesProvider>
                                        <ExpensesProvider>
                                            <QuestionnaireProvider>
                                                {getLayout(
                                                    <ProtectedRoute>
                                                        <Component {...pageProps} />
                                                    </ProtectedRoute>
                                                )}
                                            </QuestionnaireProvider>
                                        </ExpensesProvider>
                                    </PurchasesProvider>
                                </SearchTermsProvider>
                            </UserProvider>
                        </Provider>
                    </FireProvider>
                </LogProvider>
            </AppContext.Provider>
        ) : <Loader/>;
    } catch (err) {
        console.log('Error while rendering app', err);
        return <>{JSON.stringify(err)}</>;
    }
};

// initial props required only for publicRuntimeEnvironment
MyApp.getInitialProps = async (ctx) => ({...await App.getInitialProps(ctx)});

export default appWithTranslation(MyApp/* , nextI18NextConfig*/);
