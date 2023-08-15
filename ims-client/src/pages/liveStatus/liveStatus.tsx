import { useSelector } from "react-redux";
import { SYSTEM_STATUS_STATE_KEY } from "./modules/slice";
import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import { SystemStatusCollection } from "../../interface/ISystemStatus";


const LiveStatus = () => {

    // const systemsStatusCollection: SystemStatusCollection = useSelector((state: any) => state[SYSTEM_STATUS_STATE_KEY]);
    // console.log(systemsStatusCollection);

    const [systemsStatusCollection, setSystemsStatusCollection] = useState<SystemStatusCollection>()

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
        </div>
    );

}

export default LiveStatus;