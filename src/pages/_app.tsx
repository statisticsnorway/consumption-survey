import { createContext } from 'react';
import App, { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { isPWA } from '../utils/pwaUtils';
import { getFromCache, saveToCache } from '../hocs/swCache';

import 'react-day-picker/lib/style.css';
import '../styles/globals.scss';

interface AppState {
    appGlobals: {
        [key: string]: string;
    };
};

interface AppContext {
    firstVisitWeb?: boolean;
    pwaActivated?: boolean;
};

export const AppContext = createContext({} as AppContext);

class MyApp extends App<AppProps, AppContext> {
    state = {
        firstVisitWeb: true,
        pwaActivated: false,
    };

    componentDidMount(): void {
        this.pickupFromCache();
    }

    pickupFromCache = async () => {
        const firstVisitWebFlag = !await getFromCache('firstVisitWeb');
        const firstVisitWeb = Boolean(firstVisitWebFlag);

        if (firstVisitWeb) {
            await saveToCache('firstVisitWeb', 'false');
        }

        const pwaActivatedFlag
            = isPWA() ? await saveToCache('pwaActivated', 'true') : false;

        const pwaActivated = Boolean(pwaActivatedFlag);

        const newState = { firstVisitWeb, pwaActivated };
        console.log(`${new Date()} : setState called with `, newState);
        this.setState(newState);
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <AppContext.Provider value={this.state}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppContext.Provider>
        );
    }
};

/*
const MyApp = ({Component, pageProps}) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};
*/

export default MyApp;

