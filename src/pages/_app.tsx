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
import ProtectedRoute from '../components/auth/ProtectedRoute';

import '../styles/globals.scss'
import 'react-day-picker/lib/style.css'
import 'rc-time-picker/assets/index.css'

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
            : false

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
        const {Component, pageProps} = this.props
        const {initComplete} = this.state
        return (
            <AppContext.Provider value={{envVars: appConfig}}>
                <UserProvider>
                    <ProtectedRoute>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ProtectedRoute>
                </UserProvider>
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

export default appWithTranslation(MyApp)
