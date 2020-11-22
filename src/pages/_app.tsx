import { createContext } from 'react'
import App, { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { isPWA } from '../utils/pwaUtils'
import { getFromCache, saveToCache } from '../hocs/swCache'
import { appWithTranslation } from '../../i18n'

const PreferencesProvider = dynamic(
    () => import('../idb/PreferencesProvider'),
    {ssr: false}
)

const AuthProvider = dynamic(() => import('../components/auth/AuthProvider'), {
    ssr: false,
})

import 'react-day-picker/lib/style.css'
import 'rc-time-picker/assets/index.css'
import '../styles/globals.scss'
import dynamic from 'next/dynamic'
import Loader from '../components/common/Loader'
import FireProvider from '../firebase/FireProvider';
import UserProvider from '../firebase/UserProvider';
import { ProtectedRoute } from '../firebase/UserProvider';

interface AppContext {
    firstVisitWeb?: boolean
    pwaActivated?: boolean
}

export const AppContext = createContext({} as AppContext)

class MyApp extends App<AppProps, AppContext> {
    state = {
        firstVisitWeb: true,
        pwaActivated: false,

        initComplete: false,
    }

    static async getInitialProps(ctxt) {
        return {
            ...(await App.getInitialProps(ctxt)),
        }
    }

    componentDidMount(): void {
        this.pickupFromCache()
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
    }

    render() {
        const {Component, pageProps} = this.props
        const {initComplete} = this.state
        return (
            <FireProvider>
                <UserProvider>
                    <ProtectedRoute>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ProtectedRoute>
                </UserProvider>
            </FireProvider>
        )
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
