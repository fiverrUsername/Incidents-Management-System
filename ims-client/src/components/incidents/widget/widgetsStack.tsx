import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import IAggregation from '../../../interfaces/IAggregation';
import Logger from '../../../loggers/logger';
import backendServices from '../../../services/backendServices/backendServices';
import Widget from './widget';

const NewStack = styled(Stack)(() => ({
  '&': {
    'top': '123px',
    'left': '122px',
    'gap': '20px',
    'display': 'flex',
    'paddingLeft': '25px',
    'paddingRight': '25px'
  }
}));

const iconMapping = {
  'Active Count': <BarChartIcon />,
  'Average Cost': <MonetizationOnIcon />,
  'Average Duration Hours': <ScheduleIcon />,
};

export default function WidgetsStack() {
  const [aggregateIncident, setAggregateIncident] = useState<IAggregation | null>(null);
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const fetchData = async () => {
    try {
      const response: any = await backendServices.getAggregation();
      Logger.info({ source: "Widget stack", message: "Get aggregation success!" })
      setAggregateIncident(response);
    } catch (error) {
      Logger.error({ source: "Widget stack", message: "Error getting aggregation." });
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <NewStack direction={isMobile ? 'column' : 'row'} spacing={2} justifyContent={isMobile ? 'flex-start' : 'flex-end'} >
        {aggregateIncident && <>
          <Widget title="Active Count" aggregation={aggregateIncident.activeCount} icon={iconMapping['Active Count']} />
          <Widget title="Average Cost" aggregation={aggregateIncident.averageCost} icon={iconMapping['Average Cost']} />
          <Widget title="Average Duration Hours" aggregation={aggregateIncident.averageDurationHours} icon={iconMapping['Average Duration Hours']} />
        </>}
      </NewStack>
    </div>
  );
}