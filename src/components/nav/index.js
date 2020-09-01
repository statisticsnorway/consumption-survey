import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Nav = () => (
    <nav>
        <Head>
            <meta charset='utf-8' />
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
            <meta name='description' content='Description' />
            <meta name='keywords' content='Keywords' />
            <title>Next.js PWA Example</title>

            <link rel='manifest' href='/manifest.json' />
            <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
            <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
            <link rel='apple-touch-icon' href='/apple-icon.png'></link>
            <meta name='theme-color' content='#317EFB' />
        </Head>
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
        </ul>
    </nav>
);

export default Nav;
