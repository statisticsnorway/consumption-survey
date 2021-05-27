import { useTranslation } from 'react-i18next';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import { useEffect } from 'react';
import { isPWA } from '../utils/pwaUtils';
import { PATHS } from '../uiConfig';
import { useRouter } from 'next/router';

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
        <Workspace>
            <PageTitle title={t('title')}/>
            {langComp}
            <hr/>
        </Workspace>
    );
};

export const getInitialProps = async () => ({});

export default Index;

