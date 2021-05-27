import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Edit3 } from 'react-feather';
import usePurchases from '../../hocs/usePurchases';
// import usePurchases from '../../mock/usePurchases';
import { krCents, notEmptyString } from '../../utils/jsUtils';
import {
    DASHBOARD_DATE_GROUPING_FORMAT,
    dateComparator,
    dateFormatDayDate,
    parseDate,
    simpleFormat
} from '../../utils/dateUtils';
import { PATHS } from '../../uiConfig'

import styles from './styles/purchases.module.scss';
import NoRecords from '../common/blocks/NoRecords';
import { isPurchaseComplete, PurchaseStatus, PurchaseType } from '../../firebase/model/Purchase';
import OcrStatus from './status/OcrStatus';
import Loader from '../common/Loader';
import { extractPurchaseInfo } from '../../utils/receiptUtils';

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
    const {purchases, purchasesByDate, editPurchase} = usePurchases();
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
            purchases.forEach(purchase => {
                const {status, ocrResults, registeredTime} = purchase;
                if ((status === PurchaseStatus.OCR_COMPLETE) && ocrResults) {
                    const {purchase: extracted, errors} = extractPurchaseInfo(ocrResults, registeredTime);
                    const errorItems = Object.keys(errors)
                        .find(item => errors[item] === 'error');

                    if (errorItems && errorItems.length > 0) {
                        editPurchase(purchase.id, {
                            status: PurchaseStatus.OCR_PENDING_USER_APPROVAL,
                        }).then(()=> {
                            console.log('purchase moved to pending approval due to errors', errors);
                        }).catch(err => {
                            console.log('could not updated pending approval status on purchase', purchase, err);
                        });
                    } else {
                        editPurchase(purchase.id, {
                            ...extracted,
                            status: PurchaseStatus.COMPLETE,
                        })
                            .then(() => {
                                console.log('purchase updated with new values (complete)');
                            })
                            .catch(err => {
                                console.log('could not updated complete status on purchase', purchase, err);
                            });
                    }
                }
            });
        }
    }, [purchases]);

    useEffect(() => {
        if (purchases) {
            setBeingScanned(purchases.filter(p => p.status === PurchaseStatus.OCR_IN_PROGRESS));
            setWaitingApproval(purchases.filter(p => p.status === PurchaseStatus.OCR_PENDING_USER_APPROVAL));
            setErrorCases(purchases.filter(p => ERROR_CASES.includes(p.status)));
        }
    }, [purchases]);


    useEffect(() => {
        if (purchasesByDate) {
            setSorted(Object.keys(purchasesByDate)
                .sort(dateComparator));
        }
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

    const dfdComp = (datesForDisplay && (datesForDisplay.length >= 1)) ? (
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

    const makeListing = (selectedPurchases) => (
        <div className={styles.purchaseGroup}>
            <div className={styles.purchaseGroupEntries}>
                {selectedPurchases.map((p) => {
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

    console.log('should show', purchases, purchasesByDate, sorted);

    return (purchases && purchasesByDate) ? (
        <div className={styles.purchasesList}>
            {(waitingApproval.length > 0) && makeListing(waitingApproval)}
            {(beingScanned.length > 0) && makeListing(beingScanned)}
            {dfdComp}
        </div>
    ) : <Loader/>;
};

export default PurchasesList;
