import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import { withTranslation } from 'next-i18next';
import DayPicker from 'react-day-picker'
import { Plus, Camera, Edit, X } from 'react-feather'
import PurchasesList from '../../components/purchases/PurchasesList';
import Tabs from '../../components/blocks/tabs/Tabs';
import FloatingButton from '../../components/common/buttons/FloatingButton'
import usePurchases from '../../hocs/usePurchases';
import { add, sub } from 'date-fns';

import styles from './dashboard.module.scss'
import { makeDummyComponent } from '../../utils/dummy';

const today = new Date();
const surveyStart = sub(today, { days: 7 });
const surveyEnd = add(today, { days: 7 });

const modifiers = {
    surveyPeriod: {
        after: surveyStart,
        before: surveyEnd,
    },
    missingStretch: {
        after: new Date(2020, 8, 10),
        before: new Date(2020, 8, 14),
    },
    surveyPeriodFirstDay: add(surveyStart, { days: 1 }),
    surveyPeriodLastDay: sub(surveyEnd, { days: 1 }),
};

const getModifiers = (purchases) => {
  const withEntries = purchases.map(purchase => new Date(purchase.when));
  return {
      ...modifiers,
      withEntries,
  };
};

const Dashboard = ({t}) => {
    const router = useRouter();
    const {purchases} = usePurchases();

    const FLOATING_BTN_OPTIONS = {
        iconResting: <Plus/>,
        iconActive: <X/>,
    };

    const FLOATING_MENU_OPTIONS = [
        {
            id: 'registerNew',
            onClick: () => {
                router.push('/purchases/addPurchase');
            },
            icon: <Edit/>,
        }, {
            id: 'scanReceipt',
            onClick: () => {
                router.push('/purchases/scanReceipt');
            },
            icon: <Camera/>,
        }
    ];

    const renderDay = (day) => {
        return (
            <div className={styles.dashboardDiaryDay}>{day.getDate()}</div>
        );
    }

    const DASHBOARD_TABS = [
        {
            title: t('diary.title'),
            id: 'diary',
            renderTab: () => (
                <>
                    <div className={styles.dashboardDiary}>
                        <DayPicker
                            canChangeMonth={true}
                            onDayClick={(d) => {
                                console.log('Showing purchases on ', d)
                            }}
                            renderDay={renderDay}
                            modifiers={getModifiers(purchases)}
                            initialMonth={new Date()}
                            showOutsideDays={true}
                        />
                    </div>
                    <div className={styles.dashboardPurchaseList}>
                        <PurchasesList/>
                    </div>
                </>
            ),
        }, {
            title: 'Faste utgifter',
            id: 'regularExpenses',
            renderTab: () => (
                <div className={styles.dashboardRegularExpenses}>
                    {makeDummyComponent('Kommer Snart')}
                </div>
            ),
        }
    ];

    return (
        <div className={styles.dashboard}>
            <Tabs
                tabs={DASHBOARD_TABS}
                defaultActive={'diary'}
                className={styles.dashboardTabs}
            >
            </Tabs>
            <FloatingButton
                mainProps={FLOATING_BTN_OPTIONS}
                childButtonProps={FLOATING_MENU_OPTIONS}
                className={styles.floatingAddNew}
            />
        </div>
    )
};

export default withTranslation('dashboard')(Dashboard);
