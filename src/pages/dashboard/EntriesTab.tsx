import { useTranslation } from 'react-i18next';
import styles from './dashboard.module.scss';
import PurchasesList from '../../components/purchases/PurchasesList';
import PurchasesByDate from '../../components/purchases/PurchasesByDate';
import usePurchases from '../../mock/usePurchases';
import { useEffect, useState } from 'react';

const EntriesTab = ({dateSelection, selectDate, deselectDate}) => {
    const {t} = useTranslation('dashboard');
    const {purchasesByDate} = usePurchases();

    const [entriesComp, setEntriesComp] = useState(null);

    useEffect(() => {
        const purchases = dateSelection ? purchasesByDate[dateSelection] : null;
        console.log('should show', purchases);

        setEntriesComp(
            dateSelection ? (
                <PurchasesByDate
                    date={dateSelection}
                    purchases={purchases}
                    deselectDate={deselectDate}
                    selectDate={selectDate}
                />
            ) : (
                <>
                    <h1>{t('entries.title')}</h1>
                    <div className={styles.entries}>
                        <PurchasesList/>
                    </div>
                </>
            )
        );
    }, [dateSelection]);

    console.log('Entries Tab', dateSelection, purchasesByDate);

    return entriesComp;
};

export default EntriesTab;
