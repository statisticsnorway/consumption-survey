import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Edit3 } from 'react-feather';
// import usePurchases from '../../hocs/usePurchases';
import usePurchases from '../../mock/usePurchases';
import { krCents, notEmptyString } from '../../utils/jsUtils';
import {
    DASHBOARD_DATE_GROUPING_FORMAT,
    dateComparator,
    parseDate,
    simpleFormat,
    dateFormatDayDate
} from '../../utils/dateUtils';
import { DASHBOARD_TABS, PATHS, TABS_PARAMS, makeDashboardPath } from '../../uiConfig';

import styles from './purchases.module.scss';

const prepForDisplay = (date) => {
    const [dt, month] =
        simpleFormat(parseDate(date), DASHBOARD_DATE_GROUPING_FORMAT)
            .split('.');

    return (
        <>
            <span className={styles.purchaseGroupDateMonth}>{month.toLowerCase()}</span>
            <span className={styles.purchaseGroupDateDay}>{dt}</span>
        </>
    );
};

export const listDayDate = (date, styles) => {
    const [dt, day] =
        dateFormatDayDate(parseDate(date))
            .split('.');

    return (
        <>
            <span className={styles.purchaseGroupDateMonth}>{day.toLowerCase()}</span>
            <span className={styles.purchaseGroupDateDay}>{dt}</span>
        </>
    );
};

export const purchaseDatePath = (date) =>
    makeDashboardPath(DASHBOARD_TABS.ENTRIES, {[TABS_PARAMS.SELECTED_DATE]: date});

export const getPurchaseName = (purchase) => {
    return notEmptyString(purchase.name) ? (
        <span className={styles.purchaseEntryName}>{purchase.name}</span>
    ) : (
        <span className={`${styles.purchaseEntryName} ${styles.temporaryPurchaseName}`}>
            ({(purchase.items && purchase.items[0] && purchase.items[0].name) || '??'})
        </span>
    );
}

const PurchasesList = ({limit = -1}) => {
    const {t} = useTranslation('purchases');
    const {purchasesByDate} = usePurchases();
    const [sorted, setSorted] = useState([]);
    const [datesForDisplay, setDatesForDisplay] = useState([]);

    useEffect(() => {
        setSorted(Object.keys(purchasesByDate)
            .sort(dateComparator));
    }, [purchasesByDate]);

    useEffect(() => {
        setDatesForDisplay((limit > 0) ? sorted.slice(0, limit) : sorted);
    }, [sorted]);

    return (
        <div className={styles.purchasesList}>
            {datesForDisplay
                .map((dateOfPurchase) => {
                    const purchases = purchasesByDate[dateOfPurchase];
                    return (
                        <div className={styles.purchaseGroup}>
                            <div className={styles.purchaseGroupDate}>
                                {listDayDate(dateOfPurchase, styles)}
                            </div>
                            <div className={styles.purchaseGroupEntries}>
                                {purchases.map(p => {
                                    const editPurchaseUrl = `${PATHS.EDIT_PURCHASE}?purchaseId=${p.id}`;
                                    return (
                                        <Link
                                            href={editPurchaseUrl}
                                        >
                                            <div className={styles.purchaseGroupEntry}>
                                                {getPurchaseName(p)}
                                                <div className={styles.purchaseTotalEdit}>
                                                    <span className={styles.purchaseEntryTotal}>
                                                        {krCents(Number(p.amount || 0))}
                                                    </span>
                                                    <Edit3 width={20} height={20} className={styles.editPurchase}/>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default PurchasesList;
