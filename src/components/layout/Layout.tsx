import { ReactNode, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { useIdleTimer } from 'react-idle-timer';
import { differenceInMinutes } from 'date-fns';
import Header from './Header';
import Footer from './Footer';
import Workspace from './Workspace';
import SWHelper from '../pwa/SWHelper';

import { isBrowser } from '../../utils/pwaUtils';
import { AppContext } from '../../pages/_app';
import Pin from '../auth/Pin';
import Auth from '../auth/Auth';

export const THREE_MINUTES = 3;

type LayoutProps = {
    children: ReactNode,
    isOnline?: boolean,
    home?: boolean,
};

const Layout = (props: LayoutProps) => {
    const [isOnline, setIsOnline] = useState(true);
    const {firstVisitWeb, pwaActivated} = useContext(AppContext);
    const [wentIdleAt, setWentIdleAt] = useState(null);
    const [activeAgainAt, setActiveAgainAt] = useState(null);
    const [needPinAuth, setNeedPinAuth] = useState(true);

    const {reset} = useIdleTimer({
        timeout: 5 * 1000,
        onIdle: () => {
            setWentIdleAt(new Date());
        },
        onActive: () => {
            setActiveAgainAt(new Date());
        },
        debounce: 500
    });

    useEffect(() => {
        // setup cleanup of idleTimer
        return () => {
            reset();
        }
    }, []);

    useEffect(() => {
        if (wentIdleAt &&
            (differenceInMinutes(activeAgainAt, wentIdleAt) >= THREE_MINUTES)) {
            setWentIdleAt(null);
            setNeedPinAuth(true);
        }
    }, [activeAgainAt]);

    useEffect(() => {
        if (isBrowser() && ('ononline' in window) && ('onoffline' in window)) {
            setIsOnline(window.navigator.onLine);

            if (!window.ononline) {
                window.addEventListener('online', () => {
                    setIsOnline(true);
                });
            }

            if (!window.onoffline) {
                window.addEventListener('offline', () => {
                    setIsOnline(false);
                });
            }
        }
    }, []);

    console.log('Layout', firstVisitWeb, pwaActivated);
    console.log('Went Idle @', wentIdleAt, 'active again @', activeAgainAt);

    return (
        <html lang="no">
        <Head>
            <meta charSet='utf-8'/>
            <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
            <meta name='viewport'
                  content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1'/>
            <meta name='description' content='Description'/>
            <meta name='keywords' content='Keywords'/>
            <title>SSB Forbruksundersøkelse 2021</title>
            <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"/>
            <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>

            <link rel="icon" href='/favicon-16x16.png' type='image/png' sizes='16x16'/>
            <link rel="icon" href='/favicon-32x32.png' type='image/png' sizes='32x32'/>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
            <meta name="theme-color" content="#0b2e13"/>
        </Head>
        <div>
            <Header siteTitle="Forbruk 2021" version="0.1" isOnline={isOnline}/>
            <Workspace>
                <SWHelper isOnline={isOnline} firstVisitWeb={firstVisitWeb}/>
                <Auth>
                    {needPinAuth ? <Pin onValidPin={() => {
                        setNeedPinAuth(false);
                    }}/> : props.children}
                </Auth>
            </Workspace>
            <Footer/>
        </div>
        </html>
    );
};

export default Layout;
