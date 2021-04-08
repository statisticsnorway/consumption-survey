import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const PurchasesNoSSR = dynamic(
    () => import('../../../components/v2/purchases/Purchases'),
    { ssr: false }
);

const PurchasesPage = () => {
    const {t} = useTranslation('purchases');
    const router = useRouter();
    const { highlight } = router.query;


    return (
        <>
            <h1>{t('title')}</h1>
            <PurchasesNoSSR highlight={highlight as string}/>
        </>
    );

};

export default PurchasesPage;
