import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import styles from '../components/home.module.scss';

const HomeNoSSR = dynamic(
    () => import('../components/Home'),
    {ssr: false}
);

const HomePage = () => {
    const {t} = useTranslation('homeTab');

    return (
        <div className={styles.home}>
            <h1>{t('title')}</h1>
            <HomeNoSSR/>
        </div>
    );
};

export default HomePage;
