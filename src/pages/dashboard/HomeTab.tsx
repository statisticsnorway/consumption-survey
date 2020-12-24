import { useTranslation } from 'react-i18next';
import DayPicker from 'react-day-picker';
import { ArrowRight, Camera, Edit, Plus, X } from 'react-feather';
import PurchasesList from '../../components/purchases/PurchasesList';
import FloatingButton from '../../components/common/buttons/FloatingButton';

import styles from './dashboard.module.scss';
import { add, sub } from 'date-fns';
import { useRouter } from 'next/router';
import usePurchases from '../../mock/usePurchases';
import SimpleBarChart from '../../components/common/charts/SimpleBarChart';
import { PurchaseType } from '../../firebase/model/Purchase';

const today = new Date();
const surveyStart = sub(today, {days: 7});
const surveyEnd = add(today, {days: 7});

const FLOATING_BTN_OPTIONS = {
    iconResting: <Plus/>,
    iconActive: <X/>,
};

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

const HomeTab = ({onDayClick, setActiveTab}) => {
    const {t} = useTranslation('dashboard');
    const router = useRouter();
    const {purchases, purchasesByDate} = usePurchases();

    const FLOATING_MENU_OPTIONS = [
        {
            id: 'registerNew',
            title: t('fab.registerNew'),
            onClick: () => {
                router.push('/purchases/addPurchase');
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

    const getModifiers = (purchases) => {
        const withEntries = purchases.map(purchase => new Date(purchase.when));
        return {
            ...modifiers,
            withEntries,
        };
    };

    const renderDay = (day) => {
        return (
            <div className={styles.dashboardDiaryDay}>{day.getDate()}</div>
        );
    };

    return (
        <>
            <h1>{t('diary.title')}</h1>
            <div className={styles.dashboardDiary}>
                <DayPicker
                    canChangeMonth={true}
                    onDayClick={onDayClick}
                    renderDay={renderDay}
                    modifiers={getModifiers(purchases)}
                    initialMonth={new Date()}
                    showOutsideDays={true}
                />
            </div>
            <div className={styles.dashboardPurchaseList}>
                <div className={styles.dashboardPurchaseListHeader}>
                    <h3>Siste registreringer</h3>
                    <a
                        className={styles.allEntriesLink}
                        onClick={() => {
                            setActiveTab('entries');
                        }}
                    >
                        <span>Se alle</span>
                        <ArrowRight className={styles.allEntriesIcon}/>
                    </a>
                </div>
                <PurchasesList/>
            </div>
            <FloatingButton
                mainProps={FLOATING_BTN_OPTIONS}
                childButtonProps={FLOATING_MENU_OPTIONS}
                className={styles.floatingAddNew}
            />
        </>
    );
};

export default HomeTab;
