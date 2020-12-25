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
    xLabel?: string;
    yLabel?: string;
    xTitle?: string;
    yTitle?: string;
    yLabelFormatter?: () => string;
    drillDown?: DrillDownData[];
    className?: string;
};

const SimpleBarChart = ({
                            type = BarChartType.COLUMN,
                            seriesName,
                            data,
                            drillDown,
                            xLabel,
                            yLabel,
                            xTitle,
                            yTitle,
                            yLabelFormatter,
                            className
                        }: SimpleBarChartProps) => {
    const plotOptions = {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                formatter: (typeof yLabelFormatter === 'function') ?
                    yLabelFormatter :
                    function () {
                        return this.y;
                    }
            }
        }
    };

    const series = [
        {
            name: yTitle,
            colorByPoint: false,
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
            title: xTitle || '',
        },
        yAxis: {
            title: yTitle || '',
        },
        series,
        plotOptions,
    }

    return (
        <div className={className}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{style: {height: '100%'}}}
            />
        </div>
    );
};

export default SimpleBarChart;
