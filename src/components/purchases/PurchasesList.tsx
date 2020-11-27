import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { groupBy } from 'rambda';
import { PurchaseType, PurchaseGroupByDate } from '../../firebase/model/Purchase';
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
    dateFormatMonthDate(new Date(p.when));

const getGroupByFn = (groupByField) => {
    switch (groupByField) {
        case GROUP_BY_OPTIONS.DATE:
            return (purchase: PurchaseType) => getPurchaseDate(purchase);
        default:
            return (purchase: PurchaseType) => purchase.id;
    }
};

const prepForDisplay = (date) => {
    const [month, dt] = date.split('-');
    return (
        <>
            <span className={styles.purchaseGroupDateMonth}>{month.toLowerCase()}</span>
            <span className={styles.purchaseGroupDateDay}>{dt}</span>
        </>
    );
};

const PurchasesList = ({limit = -1, orderBy = SORT_OPTIONS.DATE_DESC, groupByField = GROUP_BY_OPTIONS.DATE}) => {
    const {purchases} = usePurchases();
    const {t} = useTranslation('purchases');
    const [groupsDisp, setGroupsDisp] = useState({} as PurchaseGroupByDate);

    useEffect(() => {
        const groupByFn = getGroupByFn(groupByField);
        const groups = groupBy(groupByFn)(purchases);
        console.log('groups', groups);
        setGroupsDisp(groups);
    }, [orderBy, groupByField, purchases]);

    const purchasesDisp = (
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

    return (
        <div className={styles.purchasesList}>
            {Object.keys(groupsDisp).map(date => {
                return (
                    <div className={styles.purchaseGroup}>
                        <div className={styles.purchaseGroupDate}>
                            {prepForDisplay(date)}
                        </div>
                        <div className={styles.purchaseGroupEntries}>
                            {groupsDisp[date].map(p => (
                                <div className={styles.purchaseGroupEntry}>
                                    <span>{p.where || (p.items && p.items[0] && p.items[0].itemName) || '??'}</span>
                                    <span>{p.totalPrice || '0,00'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PurchasesList;
