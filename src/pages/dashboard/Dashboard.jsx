import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import DayPicker from 'react-day-picker'
import { PlusCircle } from 'react-feather'
import {
    WorkspaceContext,
    WorkspacePanel,
} from '../../components/layout/Workspace'
import ConsumptionList from '../consumption'
import { ProtectedRoute } from '../../firebase/UserProvider';

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

const Dashboard = () => {
    const router = useRouter();
    const {purchases} = useContext(WorkspaceContext)

    const ADD_PURCHASE_PROPS = () => ({
        iconActive: <PlusCircle/>,
        onClick: (e) => {
            router.push('/fb')
        },
    })

    return (
        <div className={styles.dashboard}>
            <DayPicker
                canChangeMonth={true}
                onDayClick={(d) => {
                    console.log('Showing purchases on ', d)
                }}
                modifiers={modifiers}
                initialMonth={new Date()}
                selectedDays={purchases.map((purchase) => purchase.dateOfPurchase)}
            />
            <ConsumptionList consumptionList={purchases}/>
            <FloatingButton
                mainProps={ADD_PURCHASE_PROPS()}
                className={styles.floatingAddNew}
            />
        </div>
    )
};

export default Dashboard;
