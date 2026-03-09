import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import DateTimePickerValue from "../../components/base/datePicker/datePicker";
import HeatmapChar from "../../components/liveStatus/heatmapChar/heatmapChar";
import { keyDate } from "../../const";
import { IcolorScale, liveStatusEntry } from "../../interfaces/ILiveStatus";
import Logger from "../../loggers/logger";
import backendServices from "../../services/backendServices/backendServices";
import { StyledPaper } from "../timeLine/timeLinePage.style";

const LiveStatus = () => {

    const colorScaleDefault: IcolorScale[] = [
        {
            from: 0,
            to: 24,
            name: 'p3',
            color: '#7FFF00'
        },   //grean
        {
            from: 25,
            to: 49,
            name: 'p2',
            color: '#f4e247'
        },  //light orange
        {
            from: 50,
            to: 74,
            name: 'p1',
            color: '#FF8000'
        },  //orange
        {
            from: 75,
            to: 100,
            name: 'p0',
            color: '#FF0000'
        }, //red
    ]

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<liveStatusEntry[]>()
    const [date, setDate] = useState<Dayjs>(dayjs())

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _systemsStatusCollection: liveStatusEntry[] = await backendServices.getLiveStatus(date.toDate());
                Logger.info({ source: "Live status page", message: "Getting live status by date success!" })
                setSystemsStatusCollection(_systemsStatusCollection);
            } catch (error: any) {
                Logger.error({ source: "Live status page", message: "Error getting live status by date." });
            }
        };
        fetchData();
    }, [date]);

    const handleDateChange = (_keyType: string, event: Dayjs | null) => {
        if (event) {
            setDate(event);
        }
    };

    return (
        <div>
            <DateTimePickerValue keyType={keyDate} date={date} onDateChange={handleDateChange} />
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