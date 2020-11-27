import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PurchaseType } from '../../firebase/model/Purchase';
import usePurchases from '../../hocs/usePurchases';
import { SORT_OPTIONS, GROUP_BY_OPTIONS } from '../../utils/viewOptions';
import { dateFormatMonthDate } from '../../utils/dateUtils';

import styles from './purchases.module.scss';

export type PurchasesListProps = {
    purchases: PurchaseType[];
};

const PURCHASE_DATE_COMPARATOR = (p1, p2) =>
    (p1.whenRaw <= p2.whenRaw) ? -1 : 1;

const getPurchaseDate = (p: PurchaseType): string =>
    dateFormatMonthDate(p);


const PurchasesList = ({ limit = -1, orderBy = SORT_OPTIONS.DATE_DESC, groupBy = GROUP_BY_OPTIONS.DATE }) => {
    const { purchases } = usePurchases();
    const {t} = useTranslation('purchases');
    const [purchasesDisp, setPurchasesDisp] = useState(purchases);

    useEffect(() => {

    }, [orderBy, groupBy]);

    return (
        <div className={styles.purchasesList}>
            {purchases.map(purchase => {
                return (
                    <div className={styles.purchaseEntry}>
                        <p>id: {purchase.id}</p>
                        <p>{t('when')}: {purchase.when}</p>
                        <p>#items: {purchase.items.length}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default PurchasesList;
