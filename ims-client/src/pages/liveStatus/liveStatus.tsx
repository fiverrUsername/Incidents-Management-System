import { useSelector } from "react-redux";
import { IcolorScale, SystemStatusCollection } from "../../interface/ISystemStatus";
import { SYSTEM_STATUS_STATE_KEY } from "./modules/slice";
import React, { useEffect, useState,   } from "react";
import apiCalls from "../../service/apiCalls";
import HeatmapChar from "../../components/heatmapChar/heatmapChar";
import { Priority } from "../../interface/enums";


const LiveStatus = () => {

    // const systemsStatusCollection: SystemStatusCollection = useSelector((state: any) => state[SYSTEM_STATUS_STATE_KEY]);
    // console.log(systemsStatusCollection);

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<SystemStatusCollection>()
    const [systemsName, setsystemsName] = useState<string[]>()
    const [systemsSeries, setsystemsSeries] = useState<ApexAxisChartSeries[]>()
    const [dateIncident, setDateIncident] = useState<Date[]>()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: SystemStatusCollection = await apiCalls.getSystemsStatus();
                console.log(_systemsStatusCollection);
                setSystemsStatusCollection(_systemsStatusCollection);
                console.log(systemsStatusCollection)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

   

    const colorScale: IcolorScale[]=[
        {from: 0,to:23 ,name: 'p3',color: '#7FFF00'},
        {from: 21,to: 45,name: 'p2',color: '#FFC000'},
        {from: 46,to: 55,name: 'p1',color: '#FF8000'},
        {from: 56,to: 100,name: 'p0',color: '#FF0000'}
    ]


return (
    <div>
        <h1>LiveStatus Page</h1>
        <HeatmapChar colors={colorScale} systemsStatusCollection={systemsStatusCollection} date={[]}></HeatmapChar>
    </div>
);

}

export default LiveStatus;