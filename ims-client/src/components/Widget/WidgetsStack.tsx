import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import apiCalls from '../../service/apiCalls';
import BarChartIcon from '@mui/icons-material/BarChart';
import IAggregation  from '../../interface/aggregationInterface';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Widget from './Widget';

const NewStack = styled(Stack)(({ theme }) => ({
  '&':{
    'top': '123px',
    'left': '122px',
    'gap': '20px',
    'display':'flex',
    'paddingLeft':'25px'
  }
}));

const iconMapping = {
  'Active Count': <BarChartIcon />,
  'Average Cost': <MonetizationOnIcon />,
  'Average Duration Hours': <ScheduleIcon />,
};

export default function WidgetsStack() {
  const [aggregateIncident, setAggregateIncident] = useState<IAggregation |null>(null);
  
  const fetchData = async () => {
    try {
      const response = await apiCalls.getAggregation();
      setAggregateIncident(response);
      console.log(aggregateIncident)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NewStack  direction="row" >
        {aggregateIncident&&<>
          <Widget title="Active Count" aggregation={aggregateIncident.activeCount} icon={iconMapping['Active Count']} />
          <Widget title="Average Cost" aggregation={aggregateIncident.averageCost} icon={iconMapping['Average Cost']} />
          <Widget title="Average Duration Hours" aggregation={aggregateIncident.averageDurationHours} icon={iconMapping['Average Duration Hours']} />
        </>}
      </NewStack >
    </div>
  );
}