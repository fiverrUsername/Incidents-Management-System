import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import AddUpdate, { GetIncident } from "./AddUpdate";
import IIncident from "../../interface/incidentInterface";
import { ITimeLineEvent } from "../../interface/timeLineInterface";

interface Props {
    incident:GetIncident;
    addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void
}

export default function AddUpdateComp({ incident,addNewTimelineFunction }: Props) {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button onClick={handleClick} variant='outlined'>+ Add Update</Button>
            {open && <AddUpdate addNewTimelineFunction={addNewTimelineFunction} open={open} onClose={handleClose} incident={incident} />}
        </div>
    )
}