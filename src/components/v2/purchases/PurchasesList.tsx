import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Edit3 } from 'react-feather';
import usePurchases from '../../../hocs/usePurchases';
// import usePurchases from '../../mock/usePurchases';
import { krCents, notEmptyString } from '../../../utils/jsUtils';
import {
    DASHBOARD_DATE_GROUPING_FORMAT,
    dateComparator,
    dateFormatDayDate,
    parseDate,
    simpleFormat
} from '../../../utils/dateUtils';
import { DASHBOARD_TABS, makeDashboardPath, PATHS, TABS_PARAMS } from '../../../uiConfig';

import styles from './styles/purchases.module.scss';
import NoRecords from '../../common/blocks/NoRecords';
import { isPurchaseComplete, PurchaseStatus, PurchaseType } from '../../../firebase/model/Purchase';
import OcrStatus from './OcrStatus';

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
};

export const ERROR_CASES = [
    PurchaseStatus.OCR_ERROR,
    PurchaseStatus.OCR_UPLOAD_FAILED,
    PurchaseStatus.OCR_WAITING_NETWORK,
];

export type PurchasesListProps = {
    limit?: number;
    highlight?: string;
}

const PurchasesList = ({limit = -1, highlight = undefined}: PurchasesListProps) => {
    const {t} = useTranslation('purchases');
    const {purchases, purchasesByDate} = usePurchases();
    const [sorted, setSorted] = useState([]);
    const [datesForDisplay, setDatesForDisplay] = useState([]);
    const [highlightPurchase, setHighlightPurchase] = useState(undefined);
    const [beingScanned, setBeingScanned] = useState([]);
    const [waitingApproval, setWaitingApproval] = useState([]);
    const [errorCases, setErrorCases] = useState([]);

    useEffect(() => {
        if (highlight) {
            setHighlightPurchase(highlight);
            setTimeout(() => {
                setHighlightPurchase(undefined);
            }, 1000);
        }
    }, []);


    useEffect(() => {
        if (purchases) {
            setBeingScanned(purchases.filter(p => p.status === PurchaseStatus.OCR_IN_PROGRESS));
            setWaitingApproval(purchases.filter(p => p.status === PurchaseStatus.OCR_COMPLETE));
            setErrorCases(purchases.filter(p => ERROR_CASES.includes(p.status)));
        }
    }, [purchases]);


    useEffect(() => {
        setSorted(Object.keys(purchasesByDate)
            .sort(dateComparator));
    }, [purchasesByDate]);

    useEffect(() => {
        setDatesForDisplay((limit > 0) ? sorted.slice(0, limit) : sorted);
    }, [sorted]);

    const purchaseContent = (p: PurchaseType) => {
        if (isPurchaseComplete(p.status)) {
            return (
                <>
                    {getPurchaseName(p)}
                    <div className={styles.purchaseTotalEdit}>
                        <span className={styles.purchaseEntryTotal}>
                            {krCents(Number(p.amount || 0))}
                        </span>
                        <Edit3 width={20} height={20} className={styles.editPurchase}/>
                    </div>
                </>
            );
        } else {
            return <OcrStatus purchase={p}/>
        }
    };

    const dfdComp = (datesForDisplay.length >= 1) ? (
        <>
            {datesForDisplay
                .map((dateOfPurchase) => {
                    const purchases = (purchasesByDate[dateOfPurchase] || [])
                        .sort((a, b) => dateComparator(a.registeredTime, b.registeredTime));
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
                                            <div
                                                className={
                                                    `${styles.purchaseGroupEntry} ${highlightPurchase === p.id ? styles.highlight : ''}`}
                                            >
                                                {purchaseContent(p)}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            }
        </>
    ) : (
        <NoRecords
            singularText="et nytt kjøp"
            pluralText="alle kjøpene og løpende utgifter"
        />
    );

    const makeListing = (purchases) => (
        <div className={styles.purchaseGroup}>
            <div className={styles.purchaseGroupEntries}>
                {purchases.map((p) => {
                    const editPurchaseUrl = `${PATHS.EDIT_PURCHASE}?purchaseId=${p.id}`;
                    return (
                        <Link
                            href={editPurchaseUrl}
                        >
                            <div
                                className={
                                    `${styles.purchaseGroupEntry} ${highlightPurchase === p.id ? styles.highlight : ''}`}
                            >
                                {purchaseContent(p)}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className={styles.purchasesList}>
            {(waitingApproval.length > 0) && makeListing(waitingApproval)}
            {(beingScanned.length > 0) && makeListing(beingScanned)}
            {dfdComp}
        </div>
    );
};

export default PurchasesList;
