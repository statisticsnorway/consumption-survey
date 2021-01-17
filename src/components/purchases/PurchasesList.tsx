import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'react-feather';
// import usePurchases from '../../hocs/usePurchases';
import usePurchases from '../../mock/usePurchases';
import { krCents, notEmptyString } from '../../utils/jsUtils';
import { DASHBOARD_DATE_GROUPING_FORMAT, dateComparator, parseDate, simpleFormat, dateFormatDayDate } from '../../utils/dateUtils';
import { DASHBOARD_TABS, PATHS, TABS_PARAMS, makeDashboardPath } from '../../uiConfig';

import styles from './purchases.module.scss';
import { useEffect, useState } from 'react';

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

const listDayDate = (date) => {
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
    return notEmptyString(purchase.where) ? (
        <span>{purchase.where}</span>
    ) : (
        <span className={styles.temporaryPurchaseName}>
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
                        <Link href={purchaseDatePath(dateOfPurchase)}>
                            <a className={styles.purchaseGroup}>
                                <div className={styles.purchaseGroupDate}>
                                    {listDayDate(dateOfPurchase)}
                                </div>
                                <div className={styles.purchaseGroupEntries}>
                                    {purchases.map(p => (
                                        <div className={styles.purchaseGroupEntry}>
                                            <span className={styles.purchaseEntryName}>{getPurchaseName(p)}</span>
                                            <span className={styles.purchaseEntryTotal}>{krCents(Number(p.totalPrice || 0))}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.dateNav}>
                                    <ChevronRight
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </a>
                        </Link>
                    );
                })
            }
        </div>
    );
};

export default PurchasesList;
