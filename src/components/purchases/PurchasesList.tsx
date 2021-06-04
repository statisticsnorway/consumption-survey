import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Edit3 } from 'react-feather';
import usePurchases from '../../hocs/usePurchases';
// import usePurchases from '../../mock/usePurchases';
import { krCents, notEmptyString } from '../../utils/jsUtils';
import {
    dateComparator,
    dateFormatDateMonth,
    dateFormatDayDate,
    DateSortOrder,
    parseDate
} from '../../utils/dateUtils';
import { PATHS } from '../../uiConfig'
import NoRecords from '../common/blocks/NoRecords';
import {
    isPurchaseComplete,
    makePurchasesSortOptions,
    PurchasesSortOrder,
    PurchaseStatus,
    PurchaseType
} from '../../firebase/model/Purchase';
import OcrStatus from './status/OcrStatus';
import Loader from '../common/Loader';
import { extractPurchaseInfo } from '../../utils/receiptUtils';

import workspaceStyles from '../layout/workspace/workspace.module.scss';
import styles from './styles/purchases.module.scss';
import RadioGroup from '../questionnaire/RadioGroup';

export const listDayDate = (date, styles) => {
    const [dt, mon] =
        dateFormatDateMonth(parseDate(date))
            .split('.');

    return (
        <>
            <span className={styles.purchaseGroupDateDay}>{dt}</span>
            <span className={styles.purchaseGroupDateMonth}><pre>{mon.toLowerCase().slice(0, 3)}</pre></span>
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
    const [showPurchases, setShowPurchases] = useState<boolean>(true);
    const [sortOrder, setSortOrder] = useState<PurchasesSortOrder>(PurchasesSortOrder.NEWEST_FIRST);

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

                    const needsApproval = (errorItems && errorItems.length > 0);
                    const newStatus = needsApproval
                        ? PurchaseStatus.OCR_PENDING_USER_APPROVAL
                        : PurchaseStatus.COMPLETE;

                    editPurchase(purchase.id, {
                        ...extracted,
                        status: newStatus,
                    })
                        .then(() => {
                            const msg = needsApproval
                                ? 'purchase moved to pending approval due to errors'
                                : 'purchase updated with new values (complete)';
                            console.log(msg, errors);
                        })
                        .catch(err => {
                            const msg = needsApproval
                                ? 'could not updated pending approval status on purchase'
                                : 'could not updated complete status on purchase';

                            console.log(msg, purchase, err, errors);
                        });
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
                .sort(dateComparator(
                    (sortOrder === PurchasesSortOrder.NEWEST_FIRST) ?
                        DateSortOrder.DESC :
                        DateSortOrder.ASC
                )));
        }
    }, [purchasesByDate, sortOrder]);

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
                        .sort(dateComparator(
                            (sortOrder === PurchasesSortOrder.NEWEST_FIRST) ? DateSortOrder.DESC : DateSortOrder.ASC
                        ));
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
            singularText="et kjøp"
            pluralText="alle kjøp"
            showAddNew={false}
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

    const togglePurchasesVisibility = () => {
        setShowPurchases(!showPurchases);
    };

    const purchasesComp = (purchases && purchasesByDate) ? (
        <div className={styles.purchasesList}>
            {(errorCases.length > 0) && makeListing(errorCases)}
            {(waitingApproval.length > 0) && makeListing(waitingApproval)}
            {(beingScanned.length > 0) && makeListing(beingScanned)}
            {dfdComp}
        </div>
    ) : <Loader/>;

    const sortComp = (
        <RadioGroup
            id="purchasesSort"
            items={makePurchasesSortOptions(t)}
            orientation={'row'}
            selectedValue={sortOrder}
            onChange={(value) => setSortOrder(value)}
            disabled={false}
            noSkin={true}
            className={styles.radioGroup}
            boxClass={styles.radioBox}
            radioClass={styles.radio}
            prefix={t('sections.purchases.sorting.prefix')}
        />
    );

    return (
        <div className={workspaceStyles.section}>
            <div className={workspaceStyles.sectionHeader}>
                <span className={workspaceStyles.sectionTitle}>{t('sections.purchases.title')}</span>
                <span className={workspaceStyles.sectionVisibility} onClick={togglePurchasesVisibility}>
                    {showPurchases && <ChevronDown/>}
                    {!showPurchases && <ChevronUp/>}
                </span>
            </div>

            {showPurchases &&
            <div className={workspaceStyles.sortableList}>
                {sortComp}
                {purchasesComp}
            </div>
            }
        </div>
    );
};

export default PurchasesList;
