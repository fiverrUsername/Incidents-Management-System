import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { IcolorScale, liveStatusEntry } from '../../../interfaces/ILiveStatus';
import "./heatmapChar.css";
import { left } from '@popperjs/core';
import theme from '../../../theme';

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
      fontFamily:theme.typography.fontFamily,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,  
          selection: false,  
          zoom: false, 
          zoomin: false,
          zoomout: false,
          pan: false,
        },
      },
    },
    legend: {	
      fontSize: "16px",	
      markers: {	
        height: 16,	
        width: 16	
      }},
    grid:{
      padding:{
        top:10,
        right:40,
         bottom:10,
         left:20
  }

    },
    responsive: [
      {
        breakpoint: 5000,
        options: {
          chart: {
            width: '100%', 
            height: 250,
          },
        },
      },
    ],
    stroke: {
       
      width: 3,
      
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0,
        colorScale: {
          ranges: props.colors,
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
        style:{
          fontSize:'18px'
        }
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
            '<div class="title_tooltip"  >&nbsp;&nbsp;Date:' + date + '&nbsp;</div>' +	
            '<span>&nbsp; ' + dataPoint.systemName + '&nbsp;</span>' +	
            '<br />' +	
            '<span>&nbsp;&nbsp;Incidents: ' + dataPoint.incidentCounter + '&nbsp;</span>' +	
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