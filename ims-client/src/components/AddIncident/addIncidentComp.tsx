import { Button } from "@mui/material";
import React,{ useState } from "react";

import IIncident from "../../interface/incidentInterface";
import AddIncident from "./addIncident";

export interface Props {
    incidents: IIncident[]
    setIncident: any
}

export default function AddIncidentComp({ incidents, setIncident }: Props) {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClick} variant='outlined'>+ Add New</Button>
            {open && <AddIncident open={open} onClose={handleClose} incidents={incidents} setIncidents={setIncident} />}
        </div>
    )

}

