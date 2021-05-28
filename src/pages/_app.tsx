import App from 'next/app';
import getConfig from 'next/config';
import { appWithTranslation } from '../../i18n';
import { sanitizeConfig, loadFromEnvVars } from '../utils/cfgUtils';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';

import '../styles/globals.scss'
import '../styles/QuestionnaireApp.css'
import { useEffect, useState } from 'react';
import FireProvider from '../firebase/FireProvider';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import UserProvider from '../firebase/UserProvider';
import Loader from '../components/common/Loader';
import PurchasesProvider from '../firebase/PurchasesProvider';
import { applyMiddleware, createStore, Store } from 'redux';
import reducer, { QuestionState } from '../store/reducers/questionReducer';
import { DispatchType, QuestionAction } from '../store/actionCreators';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import SearchTermsProvider from '../firebase/SearchTermsProvider';

const store: Store<QuestionState, QuestionAction> & {
    dispatch: DispatchType
} = createStore(reducer,
    applyMiddleware(thunk)
)

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

const MyApp = ({Component, pageProps}) => {
    const {i18n} = useTranslation('welcome');
    const [firebaseConfig, setFirebaseConfig] = useState<object>(null);

    const getLayout = Component.getLayout || (comp => <Layout>{comp}</Layout>);

    useEffect(() => {
        setFirebaseConfig(getCfg());
    }, []);


    try {
        return firebaseConfig ? (
            <FireProvider config={firebaseConfig}>
                <Provider store={store}>
                    <UserProvider>
                        <SearchTermsProvider>
                            <PurchasesProvider>
                                {getLayout(
                                    <ProtectedRoute>
                                        <Component {...pageProps} />
                                    </ProtectedRoute>
                                )}
                            </PurchasesProvider>
                        </SearchTermsProvider>
                    </UserProvider>
                </Provider>
            </FireProvider>
        ) : <Loader/>;
    } catch (err) {
        console.log('Error while rendering app', err);
        return <>{JSON.stringify(err)}</>;
    }
};

// initial props required only for publicRuntimeEnvironment
MyApp.getInitialProps = async (ctx) => ({...await App.getInitialProps(ctx)});

export default appWithTranslation(MyApp/* , nextI18NextConfig*/);
