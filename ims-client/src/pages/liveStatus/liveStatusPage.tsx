import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import HeatmapChar from "../../components/liveStatus/heatmapChar/heatmapChar";
import backendServices from "../../services/backendServices/backendServices";
import { IcolorScale, liveStatusEntry } from "../../interfaces/ILiveStatus";
import DateTimePickerValue from "../../components/base/datePicker/datePicker";
import { StyledPaper } from "../timeLine/timeLinePage.style";

const LiveStatus = () => {

    const colorScaleDefault: IcolorScale[] = [
        { from: 0, to: 24, name: 'p3', color: '#7FFF00' },   //grean
        { from: 25, to: 49, name: 'p2', color: '#f4e247' },  //light orange
        { from: 50, to: 74, name: 'p1', color: '#FF8000' },  //orange
        { from: 75, to: 100, name: 'p0', color: '#FF0000' }, //red
    ]

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<liveStatusEntry[]>()
    const [date, setDate] = useState<Dayjs>(dayjs())

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: liveStatusEntry[] = await backendServices.getLiveStatus(date.toDate());
                setSystemsStatusCollection(_systemsStatusCollection);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [date]);

    const handleDateChange = (event: Dayjs | null) => {
        if (event)
            setDate(event);
    };

    return (
        <div>
            <DateTimePickerValue date={date} onDateChange={handleDateChange} />
            {
                systemsStatusCollection &&
                <StyledPaper>
                    <HeatmapChar systemsStatusCollection={systemsStatusCollection} colors={colorScaleDefault} />
                </StyledPaper>
            }
        </div>
    );

}

export default LiveStatus;