import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import DayPicker from 'react-day-picker';
import { ArrowRight, Camera, Edit, Plus, X } from 'react-feather';
import PurchasesList from '../../components/purchases/PurchasesList';
import FloatingButton from '../../components/common/buttons/FloatingButton';
import { add, sub } from 'date-fns';
import { useRouter } from 'next/router';
import usePurchases from '../../mock/usePurchases';
import { DASHBOARD_TABS, makeDashboardPath, TABS_PARAMS } from '../../uiConfig';
import { simpleFormat } from '../../utils/dateUtils';

import styles from './dashboard.module.scss';

const today = new Date();
const surveyStart = sub(today, {days: 7});
const surveyEnd = add(today, {days: 7});

const modifiers = {
    surveyPeriod: {
        after: surveyStart,
        before: surveyEnd,
    },
    missingStretch: {
        after: new Date(2020, 8, 10),
        before: new Date(2020, 8, 14),
    },
    surveyPeriodFirstDay: add(surveyStart, {days: 1}),
    surveyPeriodLastDay: sub(surveyEnd, {days: 1}),
};

export const FLOATING_BTN_OPTIONS = {
    iconResting: <Plus/>,
    iconActive: <X/>,
};

export const FLOATING_MENU_OPTIONS = (t, router) => [
    {
        id: 'registerNew',
        title: t('fab.registerNew'),
        onClick: () => {
            router.push('/purchases/editPurchase');
        },
        icon: <Edit/>,
    }, {
        id: 'scanReceipt',
        title: t('fab.scanReceipt'),
        onClick: () => {
            router.push('/purchases/scanReceipt');
        },
        icon: <Camera/>,
    }
];

const HomeTab = ({onDayClick, setActiveTab}) => {
    const {t} = useTranslation('dashboard');
    const router = useRouter();
    const {purchases} = usePurchases();



    const getModifiers = (purchases) => {
        const withEntries = purchases.map(purchase => new Date(purchase.when));
        return {
            ...modifiers,
            withEntries,
        };
    };

    const renderDay = (day) => {
        return (
            <Link
                href={makeDashboardPath(DASHBOARD_TABS.ENTRIES, {
                    [TABS_PARAMS.SELECTED_DATE]: simpleFormat(day)
                })}
            >
                <a className={styles.dashboardDiaryDay}>{day.getDate()}</a>
            </Link>
        );
    };

    return (
        <>
            <h1>{t('diary.title')}</h1>
            <div className={styles.dashboardDiary}>
                <DayPicker
                    canChangeMonth={true}
                    renderDay={renderDay}
                    modifiers={getModifiers(purchases)}
                    initialMonth={new Date()}
                    showOutsideDays={true}
                />
            </div>
            <div className={styles.dashboardPurchaseList}>
                <div className={styles.dashboardPurchaseListHeader}>
                    <h3>{t('recent.title')}</h3>
                    <a
                        className={styles.allEntriesLink}
                        onClick={() => {
                            setActiveTab('entries');
                        }}
                    >
                        <span>{t('recent.allLink')}</span>
                        <ArrowRight className={styles.allEntriesIcon}/>
                    </a>
                </div>
                <PurchasesList limit={1}/>
            </div>
            <FloatingButton
                mainProps={FLOATING_BTN_OPTIONS}
                childButtonProps={FLOATING_MENU_OPTIONS(t, router)}
                className={styles.floatingAddNew}
            />
        </>
    );
};

export default HomeTab;
