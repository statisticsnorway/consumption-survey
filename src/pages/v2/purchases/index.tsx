import { useTranslation } from 'react-i18next';

const PurchasesPage = () => {
    const {t} = useTranslation('purchases');
    return (
        <>
            <h1>{t('title')}</h1>
            purchases list
        </>
    );

};

export default PurchasesPage;
