import React, { useEffect, useState } from "react";
import { liveStatusCollection, liveStatusEntry } from "../../interfaces/ILiveStatus";
import HeatmapChar from "../../components/liveStatus/heatmapChar/heatmapChar";
import backendServices from "../../services/backendServices/backendServices";

const LiveStatus = () => {

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<liveStatusEntry[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: liveStatusEntry[] = await backendServices.getLiveStatus();
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