import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import { SystemStatusCollection, SystemStatusEntry } from "../../interface/ISystemStatus";
import HeatmapChar from "../../components/heatmapChar/heatmapChar";

const LiveStatus = () => {

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<SystemStatusEntry[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: SystemStatusEntry[] = await apiCalls.getSystemsStatus();
                setSystemsStatusCollection(_systemsStatusCollection);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <h1>Live Status Page</h1>
            {
                systemsStatusCollection &&
                <HeatmapChar systemsStatusCollection={systemsStatusCollection} />
            }
        </div>
    );

}

export default LiveStatus;