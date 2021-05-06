import { useTranslation, withTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';

const Index = () => {
    const {t, i18n} = useTranslation('welcome');

    const langComp = ['en', 'nb', 'nn'].map(l => (
        <div style={{margin: '0 1rem'}} key={l}>
            <a onClick={async () => {
                console.log('setting new locale', l);
                await i18n.changeLanguage(l);
            }}>{l.toUpperCase()}</a>
        </div>
    ));

    return (
        <Layout>
            <h2>{t('title')}</h2>
            {langComp}
            <hr/>
        </Layout>
    );
};

export const getStaticProps = async () => ({
    props: {
        namespacesRequired: ['welcome'],
    },
});

export default Index;

