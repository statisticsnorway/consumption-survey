import React from 'react';
import DayPicker from 'react-day-picker';

import './dashboard.scss';
import 'react-day-picker/lib/style.css';

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
    return (
        <div className="dasboard">
            <DayPicker
                canChangeMonth={false}
                modifiers={modifiers}
                initialMonth={new Date(2020, 7)}
                selectedDays={[
                    new Date(2020, 7, 4),
                    new Date(2020, 7, 6),
                    new Date(2020, 7, 9)
                ]}
            />
        </div>
    )
};

export default Dashboard;
