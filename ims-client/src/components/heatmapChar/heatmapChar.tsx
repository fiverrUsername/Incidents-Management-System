// import { ApexOptions } from 'apexcharts';
// import React from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { IcolorScale, SystemStatusEntry } from '../../interface/ISystemStatus';


// interface HeatmapCharProps {
//   systemsStatusCollection: SystemStatusEntry[];
//   colors?: IcolorScale[]
//   dates: Date[]
// }
// const HeatmapChar: React.FC<HeatmapCharProps> = (props: HeatmapCharProps) => {

//   const options: ApexOptions = {
//     chart: {
//       width: 600,
//       height: 300,
//       type: 'heatmap',
//     },
//     grid: {
//       xaxis: {
//         lines: {
//           offsetX: 12,
//           offsetY: 12
//         }
//       },
//       yaxis: {
//         lines: {
//           offsetX: 12,
//           offsetY: 12
//         }
//       },
//       row: {
//         opacity: 12
//       },
//       column: {
//         opacity: 12
//       },

//     },
//     plotOptions: {
//       heatmap: {
//         shadeIntensity: 0.5,
//         colorScale: {
//           ranges: props.colors
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     xaxis: {
//       categories: ['03/08/2023', '04/08/2023', '05/08/2023', '06/08/2023'],
//       labels: {
//         show: false,
//       }
//     },
//     yaxis: {
//       labels: {
//         show: true,
//       },
//     },
//     tooltip: {
//       x: {
//         show: true,
//         format: 'dd MMM',
//         formatter: undefined,
//       },
//       y: {
//         formatter: undefined,
//         title: {
//           formatter: (seriesName) => seriesName,
//         },
//       },
//       z: {
//         formatter: undefined,
//         title: 'Size: '
//       },
//     }
//   }

//   console.log(props.systemsStatusCollection);

//   const series: ApexAxisChartSeries = [
//     {
//       name: 'Inbox',
//       data: [
//         { x: 'W1', y: 17 },
//         { x: 'W2', y: 100 },
//         { x: 'W3', y: 48 },
//         { x: 'W4', y: 32 },
//       ],
//     },
//     {
//       name: 'checkout',
//       data: [
//         { x: 'W1', y: 47 },
//         { x: 'W2', y: 29 },
//         { x: 'W3', y: 13 },
//         { x: 'W4', y: 100 },
//       ],
//     },
//   ]

//   // const series: ApexAxisChartSeries = props.systemsStatusCollection.map(systemStatus => {
//   //   return {
//   //     name: systemStatus.systemName,
//   //     data: systemStatus.systemData.map(systemData => ({
//   //       x: systemData.date,
//   //       y: systemData.incidentCounter,
//   //       fillColor: props.colors?.find(scale => scale.name === systemData.maxPriority)?.color || '#000000'
//   //     }))
//   //   };
//   // });

//   // console.log("series", series);

//   return (
//     <div id="chart">
//       <ReactApexChart options={options} series={series} type={options.chart?.type} height={options.chart?.height}
//         width={options.chart?.width} />
//     </div>
//   );
  
// };

// export default HeatmapChar;


import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { IcolorScale, liveStatusCollection, liveStatusEntry } from '../../interface/ILiveStatus';
const colorScaleDefault: IcolorScale[] = [
  { from: 0, to: 20, name: 'p3', color: '#7FFF00' },   //grean
  { from: 21, to: 45, name: 'p2', color: '#FFC000' },  //light orange
  { from: 46, to: 55, name: 'p1', color: '#FF8000' },  //orange
  { from: 56, to: 100, name: 'p0', color: '#FF0000' }, //red
]
interface HeatmapCharProps {
  systemsStatusCollection: liveStatusEntry[];
  colors?: IcolorScale[]
  dates: Date[]
}
//{ systemsStatusCollection, colors = colorScaleDefault, dates }
const HeatmapChar: React.FC<HeatmapCharProps> = (props: HeatmapCharProps) => {
  const options: ApexOptions = {
    chart: {
      width: 600,
      height: 300,
      type: 'heatmap',
    },
    // stroke: {
    // },
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
          ranges: colorScaleDefault
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      // categories: ['03/08/2023', '04/08/2023', '05/08/2023', '06/08/2023'],
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
        
    } 
    },
    yaxis: {
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
        offsetX: 0,
    }
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
  console.log(props.systemsStatusCollection);
  const series: ApexAxisChartSeries = props.systemsStatusCollection.map(systemStatus => {
    return {
      name: systemStatus.systemName,
      data: systemStatus.systemData.map(systemData => {
        const priorityInfo: IcolorScale | undefined = colorScaleDefault.find(scale => scale.name === systemData.maxPriority);
        const from: number | undefined = priorityInfo?.from;
        const to: number | undefined = priorityInfo?.to;
        const formattedDate: string = new Date(systemData.date).toISOString().split('T')[0];
        if (from !== undefined && to !== undefined) {
          const priorityValue: number = from + (to - from) / 2;
          return {
            x: formattedDate,
            y: priorityValue,
            z: systemData.incidentCounter,
          };
        }
        else {
          return {
            x: formattedDate,
            y: 0,
            z: systemData.incidentCounter,
          };
        }
      })
    };
  });
  console.log("series", series);
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type={options.chart?.type} height={options.chart?.height}
        width={options.chart?.width} />
    </div>
  );
};
export default HeatmapChar;
