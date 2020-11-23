import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import { withTranslation } from 'next-i18next';
import DayPicker from 'react-day-picker'
import { Plus, Camera, Edit, X } from 'react-feather'
import {
    WorkspaceContext,
    WorkspacePanel,
} from '../../components/layout/Workspace'
import ConsumptionList from '../consumption'
import Tabs from '../../components/blocks/tabs/Tabs';

import styles from './dashboard.module.scss'

import FloatingButton from '../../components/common/buttons/FloatingButton'

const modifiers = {
    surveyPeriod: {
        after: new Date(2020, 8, 1),
        before: new Date(2020, 8, 16),
    },
    missingStretch: {
        after: new Date(2020, 8, 10),
        before: new Date(2020, 8, 14),
    },
}

const Dashboard = ({t}) => {
    const router = useRouter();
    const {purchases} = useContext(WorkspaceContext)

    const FLOATING_BTN_OPTIONS = {
        iconResting: <Plus/>,
        iconActive: <X/>,
    };

    const FLOATING_MENU_OPTIONS = [
        {
            id: 'registerNew',
            onClick: () => {
                router.push('/purchases/addNew');
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

    const DASHBOARD_TABS = [
        {
            title: t('diary.title'),
            id: 'diary',
            renderTab: () => (
                <div className={styles.dashboardDiary}>
                    <DayPicker
                        canChangeMonth={true}
                        onDayClick={(d) => {
                            console.log('Showing purchases on ', d)
                        }}
                        modifiers={modifiers}
                        initialMonth={new Date()}
                        selectedDays={purchases.map((purchase) => purchase.dateOfPurchase)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className={styles.dashboard}>
            <Tabs
                tabs={DASHBOARD_TABS}
                defaultActive={'diary'}
                className={styles.dashboardTabs}
            >
            </Tabs>
            <ConsumptionList consumptionList={purchases}/>
            <FloatingButton
                mainProps={FLOATING_BTN_OPTIONS}
                childButtonProps={FLOATING_MENU_OPTIONS}
                className={styles.floatingAddNew}
            />
        </div>
    )
};

export default withTranslation('dashboard')(Dashboard);
