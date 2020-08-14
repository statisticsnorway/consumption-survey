import React from 'react';
import { useHistory } from 'react-router-dom';
import DayPicker from 'react-day-picker';

import './dashboard.scss';
import 'react-day-picker/lib/style.css';

import purchases from '../../mock/purchaes'

const modifiers = {
    surveyPeriod: {
        after: new Date(2020, 7, 1),
        before: new Date(2020, 7, 15),
    },
    missingStretch: {
        after: new Date(2020, 7, 10),
        before: new Date(2020, 7, 14),
    }
};

const Dashboard = () => {
    const history = useHistory();

    return (
        <div className="homeScreen">
            <div className="dashboard">
                <DayPicker
                    canChangeMonth={false}
                    onDayClick={(w) => {
                        console.log('clicked on date', w);
                        history.push('/purchases/14')
                    }}
                    modifiers={modifiers}
                    initialMonth={new Date(2020, 7)}
                    selectedDays={purchases.map(purchase => purchase.date)}
                />
            </div>
        </div>
    )
};

export default Dashboard;
