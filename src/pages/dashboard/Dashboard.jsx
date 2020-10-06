import { useContext } from 'react';
import { withRouter } from 'next/router';
import DayPicker from 'react-day-picker';
import { PlusCircle } from 'react-feather';
import { WorkspaceContext, WorkspacePanel } from '../../components/layout/Workspace';
import ConsumptionList from '../consumption';

import styles from './dashboard.module.scss';

import FloatingButton from '../../components/common/buttons/FloatingButton';

const modifiers = {
    surveyPeriod: {
        after: new Date(2020, 8, 1),
        before: new Date(2020, 8, 16),
    },
    missingStretch: {
        after: new Date(2020, 8, 10),
        before: new Date(2020, 8, 14),
    }
};

const Dashboard = ({ router }) => {
    const {consumptionList} = useContext(WorkspaceContext);

    const ADD_PURCHASE_PROPS = () => ({
        iconActive: <PlusCircle/>,
        onClick: (e) => {
            router.push('/consumption/addNew');
        }
    });

    return (
        <div className={styles.dashboard}>
            <DayPicker
                canChangeMonth={true}
                onDayClick={(d) => {
                    console.log('Showing purchases on ', d);
                }}
                modifiers={modifiers}
                initialMonth={new Date(2020, 8)}
                showWeekNumbers={true}
                selectedDays={consumptionList.map(purchase => purchase.date)}
            />
            <ConsumptionList consumption={consumptionList}/>
            <FloatingButton
                mainProps={ADD_PURCHASE_PROPS()}
                className={styles.floatingAddNew}
            />
        </div>
    );
};

export default withRouter(Dashboard);
