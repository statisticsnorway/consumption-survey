import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import { isPWA } from '../utils/pwaUtils';
import { PATHS } from '../uiConfig';

const WelcomeNoSSR = dynamic(
    () => import('../components/Welcome'),
    { ssr: false }
);

const Index = () => {
    const router = useRouter();
    const {t, i18n} = useTranslation('welcome');

    useEffect(() => {
        if (isPWA()) {
            router.push(PATHS.HOME);
        }
    }, []);

    const langComp = ['en', 'nb', 'nn'].map(l => (
        <div style={{margin: '0 1rem'}} key={l}>
            <a onClick={async () => {
                console.log('setting new locale', l);
                await i18n.changeLanguage(l);
            }}>{l.toUpperCase()}</a>
        </div>
    ));

    return (
        <Workspace showFooter={false}>
            <PageTitle title={t('title')}/>
            <WelcomeNoSSR />
        </Workspace>
    );
};

export const getInitialProps = async () => ({});

export default Index;

