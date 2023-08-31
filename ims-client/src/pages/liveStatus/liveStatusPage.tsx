import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import HeatmapChar from "../../components/liveStatus/heatmapChar/heatmapChar";
import backendServices from "../../services/backendServices/backendServices";
import { IcolorScale, liveStatusEntry } from "../../interfaces/ILiveStatus";

const LiveStatus = () => {
    const colorScaleDefault: IcolorScale[] = [
        { from: 0, to: 24, name: 'p3', color: '#7FFF00' },   //grean
        { from: 25, to: 49, name: 'p2', color: '#4CAF50' },  //light orange
        { from: 50, to: 74, name: 'p1', color: '#FF8000' },  //orange
        { from: 75, to: 100, name: 'p0', color: '#FF0000' }, //red
      ]

     


  
    const [systemsStatusCollection, setSystemsStatusCollection] = useState<liveStatusEntry[]>()
    const [datesOfIncident,setDatesOfIncident]=useState<string[]>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: liveStatusEntry[] = await backendServices.getLiveStatus();
                setSystemsStatusCollection(_systemsStatusCollection);
                console.log("_systemsStatusCollection",_systemsStatusCollection)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

        const today = new Date();
        const startDay = dayjs(today);
        
        const  _datesOfIncident:string[]=[]
        _datesOfIncident.push(startDay.format("DD/MM/YYYY"));
        
        for (let index = 9; index <=1; index=index-1) {
          const nextDate = startDay.add(index, 'day');
          const formattedDate = nextDate.format('DD/MM/YYYY');
          _datesOfIncident.push(formattedDate);
        }
        setDatesOfIncident( _datesOfIncident)
        console.log( _datesOfIncident)
    }, []);
     

    return (
        <div>
            <h1>Live Status Page</h1>
            {
                systemsStatusCollection &&
                <HeatmapChar systemsStatusCollection={systemsStatusCollection} colors={colorScaleDefault} dates={datesOfIncident} />
            }
        </div>
    );

}

export default LiveStatus;