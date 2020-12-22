import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export enum BarChartType {
    BAR = 'bar',
    COLUMN = 'column',
};

export type PlotData = {
    name: string;
    y: number;
    drillDownKey?: string;
};

export type DrillDownData = [string, number];

export type SimpleBarChartProps = {
    type?: BarChartType;
    data: PlotData[];
    seriesName: string;
    yLabel?: string;
    drillDown?: DrillDownData[];
    className?: string;
};

const SimpleBarChart = ({
                            type = BarChartType.COLUMN,
                            seriesName,
                            data,
                            drillDown,
                            className
                        }: SimpleBarChartProps) => {
    const plotOptions = {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: `{point.y:.2f} kr`
            }
        }
    };

    const series = [
        {
            name: seriesName,
            colorByPoint: true,
            data,
        }
    ];

    const options = {
        chart: {
            type
        },
        title: seriesName,
        xAxis: {
            type: 'category',
        },
        series,
        plotOptions,
    }

    return (
        <div className={className}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: '100%' }}}
            />
        </div>
    );
};

export default SimpleBarChart;
