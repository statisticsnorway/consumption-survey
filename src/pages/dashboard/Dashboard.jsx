import React from 'react';
import { useHistory } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import ConsumptionList from '../consumption/ConsumptionList';

import './dashboard.scss';
import 'react-day-picker/lib/style.css';

import consumption from '../../mock/consumption'
import FloatingButton from '../../components/buttons/FloatingButton';
import { PlusCircle, ShoppingCart, Umbrella } from 'react-feather';
import MyBrowserRouter from '../../utils/MyBrowserRouter';

const modifiers = {
    surveyPeriod: {
        after: new Date(2020, 7, 1),
        before: new Date(2020, 7, 16),
    },
    missingStretch: {
        after: new Date(2020, 7, 10),
        before: new Date(2020, 7, 14),
    }
};

const ADD_PURCHASE_PROPS = (history) => ({
    iconActive: <PlusCircle/>,
});

const CHILD_BUTTON_PROPS = (history) => ([
    {
        id: 'service',
        icon: <Umbrella/>,
        onClick: () => {
            history.push('/purchases/service');
        }
    }, {
        id: 'shop',
        icon: <ShoppingCart/>,
        onClick: () => {
            history.push('/purchases/purchase');
        }
    }
]);

const Dashboard = () => {
    const history = useHistory();

    return (
        <>
            <div className="dashboard">
                <DayPicker
                    canChangeMonth={false}
                    onDayClick={(w) => {
                        console.log('clicked on date', w);
                        history.push('/purchases/14')
                    }}
                    modifiers={modifiers}
                    initialMonth={new Date(2020, 7)}
                    selectedDays={consumption.map(purchase => purchase.date)}
                />
            </div>

            <ConsumptionList consumption={consumption}/>
            <FloatingButton
                mainProps={ADD_PURCHASE_PROPS(history)}
                childButtonProps={CHILD_BUTTON_PROPS(history)}
                className="floatingAddNew"
            />
        </>
    )
};

export default Dashboard;
