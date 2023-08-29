import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { IcolorScale, liveStatusEntry ,IliveStatus} from '../../../interfaces/ILiveStatus';
import { number } from 'prop-types';
import dayjs from 'dayjs';

interface DataPoint {
  x: string; // Assuming this is a string
  y: number; // Assuming this is a number
  z: string; // Assuming this is a string (formattedDate)
  incident: number; // Assuming this is a number (systemData.incidentCounter)
}

interface HeatmapCharProps {
  systemsStatusCollection: liveStatusEntry[];
  colors?: IcolorScale[]
  dates:string[] | undefined
  
}

//{ systemsStatusCollection, colors = colorScaleDefault }
const HeatmapChar: React.FC<HeatmapCharProps> = (props: HeatmapCharProps) => {

  const options: ApexOptions = {
    chart: {
      width: 600,
      height: 300,
      type: 'heatmap',
    },
    stroke: {
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
          ranges: props.colors
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      //categories:props.dates  ,
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
        formatter: () => '', // Set the formatter to an empty function to hide the y value
        title: {
          formatter: () => '',
        },
      },
      z: {
        formatter: undefined,
        title: 'date: ',
      },
      custom: function({seriesIndex, dataPointIndex }: {
        series: Array<{ data: Array<DataPoint> }>,
        seriesIndex: number,
        dataPointIndex: number
      }) {
        const dataPoint = props.systemsStatusCollection[seriesIndex].systemData[dataPointIndex];
        if (dataPoint.date !== undefined) {
          return (
            '<div class="arrow_box">' +
            '<span>'+  + '</span>' +
            '<br />' +
            '<span>Date: ' + dataPoint.date + '</span>' +
            '<br />' +
            '<span>Incident: ' + dataPoint.incidentCounter + '</span>' +
            '</div>'
          );
        }
        return '';
      }
    }
  }

  const series: ApexAxisChartSeries = props.systemsStatusCollection.map(liveStatus => {
   return {
      name: liveStatus.systemName,
      data: liveStatus.systemData.map(systemData => {
        const priorityInfo: IcolorScale | undefined = props.colors?.find(scale => scale.name === systemData.maxPriority);
        const from: number | undefined = priorityInfo?.from;
        const to: number | undefined = priorityInfo?.to;
        const formattedDate: string = dayjs(systemData.date).format("DD/MM/YYYY")
        //const isExist:boolean|undefined = props.dates?.includes(formattedDate);
    //  if (isExist)
     if (from !== undefined && to !== undefined) {
          const priorityValue: number = from + (to - from) / 2;
          return {
            x: formattedDate,
            y: priorityValue,
            z: formattedDate,
         
          };
        }
        else {
          return {
            x: '',
            y: 0,
            z: 0,
          };
        }
      })
    };

   
 
});
 console.log("series",series)

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type={options.chart?.type} height={options.chart?.height}
        width={options.chart?.width} />
    </div>
  );

};

export default HeatmapChar;
