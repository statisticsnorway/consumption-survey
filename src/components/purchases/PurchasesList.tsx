import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'react-feather';
// import usePurchases from '../../hocs/usePurchases';
import usePurchases from '../../mock/usePurchases';
import { krCents } from '../../utils/jsUtils';
import { DASHBOARD_DATE_GROUPING_FORMAT, dateComparator, parseDate, simpleFormat } from '../../utils/dateUtils';
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

const purchaseDatePath = (date) =>
    makeDashboardPath(DASHBOARD_TABS.ENTRIES, { [TABS_PARAMS.SELECTED_DATE]: date });

const PurchasesList = ({}) => {
    const {t} = useTranslation('purchases');
    const {purchasesByDate} = usePurchases();

    return (
        <div className={styles.purchasesList}>
            {Object.keys(purchasesByDate)
                .sort(dateComparator)
                .map((dateOfPurchase) => {
                    const purchases = purchasesByDate[dateOfPurchase];
                    return (
                        <Link href={purchaseDatePath(dateOfPurchase)}>
                            <a className={styles.purchaseGroup}>
                                <div className={styles.purchaseGroupDate}>
                                    {prepForDisplay(dateOfPurchase)}
                                </div>
                                <div className={styles.purchaseGroupEntries}>
                                    {purchases.map(p => (
                                        <div className={styles.purchaseGroupEntry}>
                                            <span>{p.where || (p.items && p.items[0] && p.items[0].name) || '??'}</span>
                                            <span>{krCents(Number(p.totalPrice || 0))}</span>
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
