import { Button } from "@mui/material";
import React, { useState } from "react";

import { ITimeLineEvent } from "../../../interfaces/ITimeLineEvent";
import { Status } from "../../../interfaces/enums";
import AddTimelineForm, { receivedIncident } from "./addTimelineEventForm/addTimelineEventForm";

interface Props {
    incident: receivedIncident;
    addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void
}

export default function AddTimeline({ incident, addNewTimelineFunction }: Props) {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {incident.status == Status.Active && <Button onClick={handleClick} variant='outlined'>+ Add Update</Button>}
            {open && <AddTimelineForm addNewTimelineFunction={addNewTimelineFunction} open={open} onClose={handleClose} incident={incident} />}
        </div>
    )
}