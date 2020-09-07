import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Workspace from './Workspace';

import styles from './styles/layout.module.scss';

type LayoutProps = {
    children: ReactNode,
    home?: boolean,
};

const Layout = ({
                    children,
                    home
                }: LayoutProps) => {
    return (
        <html lang="no">
            <Head>
                <meta charSet='utf-8'/>
                <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
                <meta name='viewport'
                      content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes'/>
                <meta name='description' content='Description'/>
                <meta name='keywords' content='Keywords'/>
                <title>SSB Forbruksundersøkelse 2021</title>
                <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"/>
                <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>

                <link rel="icon" href='/favicon-16x16.png' type='image/png' sizes='16x16' />
                <link rel="icon" href='/favicon-32x32.png' type='image/png' sizes='32x32' />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                <meta name="theme-color" content="#0b2e13"/>
            </Head>
            <div>
                <Header siteTitle="Forbruk 2021" version="0.1"/>
                <Workspace>
                    {children}
                </Workspace>
                <Footer/>
            </div>
        </html>
    );
};

export default Layout;
