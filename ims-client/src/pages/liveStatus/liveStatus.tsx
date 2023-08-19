import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import { liveStatusCollection, liveStatusEntry } from "../../interface/IliveStatus";
import HeatmapChar from "../../components/heatmapChar/heatmapChar";

const LiveStatus = () => {

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<liveStatusEntry[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: liveStatusEntry[] = await apiCalls.getSystemsStatus();
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