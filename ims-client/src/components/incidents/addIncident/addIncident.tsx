import { Button } from "@mui/material";
import React, { useState } from "react";
import IIncident from "../../../interfaces/IIncident";
import AddIncidentForm from "./addIncidentForm/addIncidentForm";
export interface Props {
    incidents: IIncident[]
    setIncident: (value: React.SetStateAction<IIncident[]>) => void
}

export default function AddIncident({ incidents, setIncident }: Props) {
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
            {open && <AddIncidentForm open={open} onClose={handleClose} incidents={incidents} setIncidents={setIncident} />}
        </div>
    )
}

