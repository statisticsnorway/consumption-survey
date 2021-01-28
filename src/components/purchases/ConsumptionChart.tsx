import { eachDayOfInterval } from 'date-fns';
import SimpleBarChart from '../common/charts/SimpleBarChart';
import usePurchases from '../../hocs/usePurchases';
// import usePurchases from '../../mock/usePurchases';

import styles from './styles/chart.module.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { simpleFormat } from '../../utils/dateUtils';
import { hasKey, krCents } from '../../utils/jsUtils';

function yLabelFormatter () {
    console.log('krCents', krCents(this.y));
    return this.y ? krCents(this.y) : '';
}

const ConsumptionChart = () => {
    const {purchasesByDate} = usePurchases();
    const {userInfo} = useContext(UserContext);
    const {journalStart, journalEnd} = userInfo.surveyInfo;

    const surveyPeriod = eachDayOfInterval({
        start: journalStart,
        end: journalEnd,
    })
        .reduce((acc, dt) => ([
            ...acc,
            {name: simpleFormat(dt), y: 0},
        ]), []);

    const datesWithEntries = Object.keys(purchasesByDate)
        .map(name => ({
            name,
            y: purchasesByDate[name]
                .reduce((acc, p) => acc + Number(p.amount), 0)
        }));

    const chartData = surveyPeriod.map(dt => ({
        ...dt,
        name: dt.name.split('.', 2).join('.'),
        y: (hasKey(purchasesByDate, dt.name) ?
            (datesWithEntries.find(e => e.name === dt.name)).y :
            dt.y),
    }));

    console.log('datesWithEntries', datesWithEntries);
    console.log('surveyPeriod', surveyPeriod);
    console.log('chartData', chartData);

    return (
        <SimpleBarChart
            data={chartData}
            seriesName="Min Periode"
            yTitle="Forbruk i surveyperioden"
            xTitle="Min Periode"
            yLabelFormatter={yLabelFormatter}
            className={styles.consumptionChart}
        />
    );
};

export default ConsumptionChart;
