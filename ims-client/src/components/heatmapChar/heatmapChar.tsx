import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { IcolorScale, SystemStatusCollection } from '../../interface/ISystemStatus';


interface HeatmapCharProps{
  systemsStatusCollection: SystemStatusCollection | undefined;
    colors?:IcolorScale[]
    date:Date[]
}
const HeatmapChar:React.FC<HeatmapCharProps> = ({systemsStatusCollection,colors,date} ) => {

  const options: ApexOptions = {
    chart: {
      width: 600,
      height: 300,
      type: 'heatmap',
    },
    grid: {
      xaxis: {
        lines: {
          offsetX: 12,
          offsetY: 12
        }
      },
      yaxis: {
        lines: {
          offsetX: 12,
          offsetY: 12
        }
      },
      row: {
        opacity: 12
      },
      column: {
        opacity: 12
      },

    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: colors
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['03/08/2023', '04/08/2023', '05/08/2023', '06/08/2023'],
      labels: {
        show: false,
      }
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      x: {
        show: true,
        format: 'dd MMM',
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: 'Size: '
      },
    }
  }

  const series: ApexAxisChartSeries = [
    {
      name: 'Inbox',
      data: [
        { x: 'W1', y: 17 },
        { x: 'W2', y: 100 },
        { x: 'W3', y: 48 },
        { x: 'W4', y: 32 },
      ],
    },
    {
      name: 'checkout',
      data: [
        { x: 'W1', y: 47 },
        { x: 'W2', y: 29 },
        { x: 'W3', y: 13 },
        { x: 'W4', y: 100 },
      ],
    },
  ]

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type={options.chart?.type} height={options.chart?.height}
        width={options.chart?.width} />
    </div>
  );
  
};

export default HeatmapChar;
