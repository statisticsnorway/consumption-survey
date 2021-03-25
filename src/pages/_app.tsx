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
import { POUCH_DATABASES } from '../uiConfig';
import SearchTermsProvider from '../firebase/SearchTermsProvider';
import {applyMiddleware, createStore, Store} from "redux";
import reducer, {QuestionState} from "../store/reducers/questionReducer";
import thunk from "redux-thunk"
import {DispatchType, QuestionAction} from "../store/actionCreators";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux"
import '../components/questionnaire/QuestionnaireApp.css'
import '@statisticsnorway/ssb-component-library/lib/bundle.css'

const appConfig = getConfig();

const store: Store<QuestionState, QuestionAction> & {
    dispatch: DispatchType
} = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

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

        console.log({appConfig})
        console.log({envVars})
        console.log(envVars.NEXT_PUBLIC_FIREBASE_CONFIG_JSON)
        // !! NextJS FACE-PALM !!
        const getCfg = () => {
            return {
                    "apiKey": "AIzaSyAkMVzI_9HXVeLNMglu5eK9dcS5hTI7Yaw",
                    "authDomain": "ssb-team-forbruk-firebase-stg.firebaseapp.com",
                    "projectId": "ssb-team-forbruk-firebase-stg",
                    "storageBucket": "ssb-team-forbruk-firebase-stg.appspot.com",
                    "messagingSenderId": "606090153334",
                    "appId": "1:606090153334:web:7aa133e874fc7f93dbfe57",
                    "databaseURL": "https://search-terms.europe-west1.firebasedatabase.app/"
                }
            // if (envVars.NEXT_PUBLIC_FIREBASE_CONFIG_JSON) {
            //     // config available as json object
            //     const cfg = JSON.parse(envVars.NEXT_PUBLIC_FIREBASE_CONFIG_JSON);
            //     console.log('found config (json)', sanitizeConfig(cfg));
            //     return cfg;
            // } else {
            //     const cfg = loadFromEnvVars(envVars, 'NEXT_PUBLIC_FB_LOCAL_');
            //     console.log('config (vars)', sanitizeConfig(cfg));
            //     return cfg;
            // }
        };

        try {
            return (
                <AppContext.Provider value={{envVars: appConfig}}>
                    <FireProvider config={getCfg()}>
                        <PouchDBProvider dbNames={POUCH_DATABASES}>
                            <Provider store={store}>
                                <UserProvider>
                                    <SearchTermsProvider>
                                        <PurchasesProvider>
                                            <ExpensesProvider>
                                                <Layout>
                                                    <ProtectedRoute>
                                                        <Component {...pageProps} />
                                                    </ProtectedRoute>
                                                </Layout>
                                            </ExpensesProvider>
                                        </PurchasesProvider>
                                    </SearchTermsProvider>
                                </UserProvider>
                            </Provider>
                        </PouchDBProvider>
                    </FireProvider>
                </AppContext.Provider>
            );
        } catch (err) {
            console.log('error while rendering app', err);
            return <>{JSON.stringify(err)}</>;
        }
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
