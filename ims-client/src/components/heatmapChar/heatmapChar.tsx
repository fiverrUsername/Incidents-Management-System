import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';


interface HeatmapCharProps{
    data:[],
    colors?:[]
    date:Date[]
}
const HeatmapChar = () => {

  const options:ApexOptions= {
    chart: {
      width:600,
      height: 300,
      type: 'heatmap',
    },
    stroke:{

    },
    grid:{
      // xaxis: {
      //   lines: {
      //     offsetX: 50,
      //     offsetY: 12
      //   }
      // },
      // yaxis: {
      //   lines: {
      //     offsetX: 12,
      //     offsetY: 12
      //   }
      // },
      // row: {
      //   opacity: 12
      // },
      // column: {
      //   opacity: 12
      // },
    
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 20,
              name: 'p3',
              color: '#7fff00',
            },
            {
              from: 21,
              to: 45,
              name: 'p2',
              color: '#ffc000', 
            },
            {
              from: 46,
              to: 55,
              name: 'p1',
              color: '#ff8000',
            },
            {
              from: 56,
              to: 100,
              name: 'p0',
              color: '#FF0000',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['03/08/2023', '04/08/2023', '05/08/2023', '06/08/2023'],
      labels:{
        show: false,
      }
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip:{
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
  

 const series:ApexAxisChartSeries= [
      {
         
        name: 'Inbox',
        data: [ 17  ,100  , 48 ,32],
      },
      {
        name: 'checkout',
        data: [ 17  ,100  , 48 ,32],
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
