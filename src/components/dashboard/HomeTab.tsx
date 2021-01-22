import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight, Camera, Edit, Plus, X } from 'react-feather';
import { Tag } from '@statisticsnorway/ssb-component-library';
import PurchasesList from '../purchases/PurchasesList';
import usePurchases from '../../mock/usePurchases';
import { DASHBOARD_TABS, PATHS, getModifiers, surveyStart, surveyEnd } from '../../uiConfig';
import { simpleFormat } from '../../utils/dateUtils';
import DiaryViz from './DiaryViz';

import styles from '../../pages/dashboard/dashboard.module.scss';

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
    const router = useRouter();
    const {purchases} = usePurchases();


    const getStatus = (id) => {
        switch (id) {
            case DASHBOARD_TABS.ENTRIES:
                return 'IN_PROGRESS';
            case DASHBOARD_TABS.REGULAR_EXPENSES:
                return 'DONE';
            case DASHBOARD_TABS.OTHER:
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

    const sectionNav = makeSectionNav([
        DASHBOARD_TABS.ENTRIES,
        DASHBOARD_TABS.REGULAR_EXPENSES,
        DASHBOARD_TABS.OTHER,
    ]);

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
        </>
    );
};

export default HomeTab;
