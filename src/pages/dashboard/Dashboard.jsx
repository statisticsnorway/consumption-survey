import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import DayPicker from 'react-day-picker'
import { ArrowRight, Plus, Camera, Edit, X } from 'react-feather'
import PurchasesList from '../../components/purchases/PurchasesList';
import Tabs from '../../components/blocks/tabs/Tabs';
import FloatingButton from '../../components/common/buttons/FloatingButton'
// import usePurchases from '../../hocs/usePurchases';
import usePurchases from '../../mock/usePurchases';
import { add, sub } from 'date-fns';

import styles from './dashboard.module.scss'
import { makeDummyComponent } from '../../utils/dummy';
import RegularExpensesList from '../../components/regularExpenses/RegularExpensesList';
import { simpleFormat } from '../../utils/dateUtils';
import PurchasesByDate from '../../components/purchases/PurchasesByDate';
import Loader from '../../components/common/Loader';

import HomeTab from './HomeTab';
import EntriesTab from './EntriesTab';

const Dashboard = () => {
    const {t} = useTranslation('dashboard');
    const [activeTab, setActiveTab] = useState('diary');
    const [selectedDate, setSelectedDate] = useState(null);

    const showPurchasesByDate = (d) => {
        console.log('Showing purchases on ', d)
        const dtSimple = simpleFormat(d);
        console.log('Should navigate to', dtSimple);

        setSelectedDate(dtSimple);
        setActiveTab('entries');

        // router.push(`/purchases/purchasesByDate?date=${dtSimple}`);
    };

    return (
        <div className={styles.dashboard}>
            <Tabs
                tabs={[
                    {
                        title: t('diary.title'),
                        id: 'diary',
                        renderTab: (
                            <HomeTab
                                onDayClick={showPurchasesByDate}
                                setActiveTab={setActiveTab}
                            />
                        ),
                    },
                    {
                        title: t('entries.title'),
                        id: 'entries',
                        renderTab: (
                            <EntriesTab
                                dateSelection={selectedDate}
                                deselectDate={() => {
                                    console.log('should reset date');
                                    setSelectedDate(null);
                                }}
                                selectDate={setSelectedDate}
                            />
                        ),
                    }, {
                        title: t('regularExpenses.title'),
                        id: 'regularExpenses',
                        renderTab: (
                            <>
                                <h1>{t('regularExpenses.title')}</h1>
                                <div className={styles.dashboardRegularExpenses}>
                                    <RegularExpensesList/>
                                </div>
                            </>
                        ),
                    }
                ]}
                active={activeTab}
                className={styles.dashboardTabs}
                onSelect={(tabId) => {
                    setActiveTab(tabId);
                }}
            >
            </Tabs>
        </div>
    );
};

export default Dashboard;
