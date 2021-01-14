import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Calendar, ShoppingCart, RotateCw, List } from 'react-feather';
import Tabs, { TabRenderOption } from '../../components/blocks/tabs/Tabs';
// import usePurchases from '../../hocs/usePurchases';
import RegularExpensesList from '../../components/regularExpenses/RegularExpensesList';
import { simpleFormat } from '../../utils/dateUtils';
import { MiscExpenses } from '../../components/common/icons/index';

import styles from './dashboard.module.scss'

import HomeTab from './HomeTab';
import EntriesTab from './EntriesTab';
import { makeDummyComponent } from '../../utils/dummy';

const Dashboard = () => {
    const {t} = useTranslation('dashboard');
    const router = useRouter();

    const pathActiveTab = router.query.selectedTab as string;
    const pathSelectedDate = router.query.selectedDate as string;

    const [activeTab, setActiveTab] = useState(pathActiveTab || 'diary');
    const [selectedDate, setSelectedDate] = useState(pathSelectedDate || null);

    console.log('query', router.query.selectedTab, router.query.selectedDate);

    useEffect(() => {
        if (router.query.selectedTab) {
            setActiveTab(router.query.selectedTab as string);

            if (router.query.selectedDate) {
                setSelectedDate(router.query.selectedDate as string);
            }
        } else {
            setActiveTab('diary');
        }
    }, [router.pathname, router.query]);

    const showPurchasesByDate = (d) => {
        console.log('Showing purchases on ', d)
        const dtSimple = simpleFormat(d);
        console.log('Should navigate to', dtSimple);

        // setSelectedDate(dtSimple);
        // setActiveTab('entries');

        router.push(`/dashboard/Dashboard?selectedTab=entries&selectedDate=${dtSimple}`);
    };

    return (
        <div className={styles.dashboard}>
            <Tabs renderTabAs={TabRenderOption.ICON}
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
                        icon: <Calendar height={24} width={24} />,
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
                                selectDate={showPurchasesByDate}
                            />
                        ),
                        icon: <ShoppingCart height={24} width={24} />,
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
                        icon: <RotateCw height={24} width={24} />,
                    }, {
                        title: 'Andre utgifter',
                        id: 'otherExpenses',
                        renderTab: makeDummyComponent('Andre utgifter'),
                        icon: <MiscExpenses width={24} height={24} />,
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
