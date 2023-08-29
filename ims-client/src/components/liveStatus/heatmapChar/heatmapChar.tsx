import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { IcolorScale, liveStatusEntry } from '../../../interfaces/ILiveStatus';
import "./heatmapChar.css";
import { left } from '@popperjs/core';

 

interface HeatmapCharProps {
  systemsStatusCollection: liveStatusEntry[];
  colors: IcolorScale[]
}

const HeatmapChar: React.FC<HeatmapCharProps> = (props: HeatmapCharProps) => {

  const options: ApexOptions = {
    chart: {
      width: 1200,
      height: 300,
      type: 'heatmap',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false, // Disable the download button
          selection: true, // Disable the selection tool
          zoom: true, // Disable zooming tool
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
    },
    grid:{
      padding:{
        top:20,
        right:40,
         bottom:50,
         left:20
  }

    },
    responsive: [
      {
        breakpoint: 787,
        options: {
          chart: {
            width: '70%', // Adjust width for mobile
            height: 200,
          },
        },
      },
    ],
    stroke: {
       
      width: 3,
      
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
      custom: function ({ seriesIndex, dataPointIndex }: {
        seriesIndex: number,
        dataPointIndex: number
      }) {
        const dataPoint = props.systemsStatusCollection[seriesIndex].systemData[dataPointIndex];
        const date = dayjs(dataPoint.date).format("DD/MM/YYYY")
        if (dataPoint.date !== undefined) {
          return (
            '<div class="arrow_box">' +
            '<div class="title_tooltip"  >Date:' + date + '</div>' +
            '<span> ' + dataPoint.systemName + '</span>' +
            '<br />' +
            '<span>Incidents: ' + dataPoint.incidentCounter + '</span>' +
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

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type={options.chart?.type} height={options.chart?.height}
        width={options.chart?.width} />
    </div>
  );

};

export default HeatmapChar;