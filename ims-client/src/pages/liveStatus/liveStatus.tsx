import { useSelector } from "react-redux";
import { SystemStatusCollection } from "../../interface/ISytemStatus";
import { SYSTEM_STATUS_STATE_KEY } from "./modules/slice";
import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import HeatmapChar from "../../components/heatmapChar/heatmapChar";


const LiveStatus = () => {

    // const systemsStatusCollection: SystemStatusCollection = useSelector((state: any) => state[SYSTEM_STATUS_STATE_KEY]);
    // console.log(systemsStatusCollection);

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<SystemStatusCollection>()
    const [systemsName, setsystemsName] = useState<string[]>()
    // const [systemsSeries, setsystemsSeries] = useState<ApexAxisChartSeries[]>({name:'',data[]})
    const [dateIncident,setDateIncident]=useState<Date[]>()
     

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: SystemStatusCollection = await apiCalls.getSystemsStatus();
                console.log(_systemsStatusCollection);
                setSystemsStatusCollection(_systemsStatusCollection);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <h1>LiveStatus Page</h1>
            <HeatmapChar></HeatmapChar>
        </div>
    );

}

export default LiveStatus;