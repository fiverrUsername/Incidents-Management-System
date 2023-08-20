import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import { IcolorScale, liveStatusCollection, liveStatusEntry } from "../../interface/ILiveStatus";
import HeatmapChar from "../../components/heatmapChar/heatmapChar";

const LiveStatus = () => {
    const colorScaleDefault: IcolorScale[] = [
        { from: 0, to: 24, name: 'p3', color: '#7FFF00' },   //grean
        { from: 25, to: 49, name: 'p2', color: '#FFC000' },  //light orange
        { from: 50, to: 74, name: 'p1', color: '#FF8000' },  //orange
        { from: 75, to: 100, name: 'p0', color: '#FF0000' }, //red
      ]

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<liveStatusEntry[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: liveStatusEntry[] = await apiCalls.getLiveStatus();
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
                <HeatmapChar systemsStatusCollection={systemsStatusCollection} colors={colorScaleDefault} />
            }
        </div>
    );

}

export default LiveStatus;