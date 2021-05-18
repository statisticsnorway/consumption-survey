import { useTranslation } from 'react-i18next';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';

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
        <Workspace>
            <PageTitle title={t('title')}/>
            {langComp}
            <hr/>
        </Workspace>
    );
};

export const getInitialProps = async () => ({});

export default Index;

