import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight, Camera, Edit, Plus, X } from 'react-feather';
import { Tag } from '@statisticsnorway/ssb-component-library';
import PurchasesList from '../purchases/PurchasesList';
import usePurchases from '../../hocs/usePurchases';
// import usePurchases from '../../mock/usePurchases';
import { DASHBOARD_TABS, PATHS, getModifiers, surveyStart, surveyEnd } from '../../uiConfig';
import { simpleFormat } from '../../utils/dateUtils';
import DiaryViz from './DiaryViz';

import styles from '../../pages/dashboard/dashboard.module.scss';
import RecentRegistrations from '../consumption/RecentRegistrations';
import useExpenses from '../../hocs/useExpenses';
// import useExpenses from '../../mock/useExpenses';
import { ReactNode, useEffect, useState } from 'react';

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

const HomeTab = ({setActiveTab, onDayClick}) => {
    const {t} = useTranslation('dashboard');
    const {purchases} = usePurchases();
    const {expenses} = useExpenses();

    const [sectionNav, setSectionNav] = useState<ReactNode>();

    useEffect(() => {
        if (purchases && expenses) {
            setSectionNav(makeSectionNav([
                DASHBOARD_TABS.ENTRIES,
                DASHBOARD_TABS.REGULAR_EXPENSES,
                DASHBOARD_TABS.OTHER,
            ]));
        }
    }, [purchases, expenses]);

    const getStatus = (id) => {
        const count = () => {
            switch (id) {
                case DASHBOARD_TABS.ENTRIES :
                    return purchases.length;
                case DASHBOARD_TABS.REGULAR_EXPENSES:
                    return expenses.length;
                default:
                    return -1;
            }
        };

        if (count() > 0) {
            return 'IN_PROGRESS';
        } else {
            return 'INIT';
        }
    };

    const makeSectionNav = (ids) => {
        return (
            <>
                <h1>{t('tasks.title')}</h1>
                <div className="section-nav">
                    {ids.map(id => {
                        const status = getStatus(id);
                        return (
                            <div className="section-nav-item" onClick={() => setActiveTab(id)}>
                                <div className="titleAndStatus">
                                    <h3 className="title">{t(`${id}.title`)}</h3>
                                    <span className={`status status-${status}`}>{t(`status.${status}`)}</span>
                                </div>
                                <ArrowRight width={20} height={20} className="link"/>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    return (
        <>
            <DiaryViz
                renderDay={onDayClick}
                modifiers={getModifiers(purchases)}
                className={styles.dashboardDiary}
                surveyStart={simpleFormat(surveyStart)}
                surveyEnd={simpleFormat(surveyEnd)}
            />
            {sectionNav}
            <>
                <h2>{t('recent.title')}</h2>
                <RecentRegistrations limit={5} setActiveTab={setActiveTab}/>
            </>
        </>
    );
};

export default HomeTab;
