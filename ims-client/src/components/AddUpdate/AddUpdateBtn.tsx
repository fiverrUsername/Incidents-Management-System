import {Button } from "@mui/material";
import React,{ useState } from "react";
import UpdateIncident, { receivedIncident } from "./UpdateIncident";
import { ITimeLineEvent } from "../../interface/timeLineInterface";
import { Status } from "../../interface/enums";

interface Props {
    incident:receivedIncident;
    addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void
}

export default function AddUpdateBtn({ incident,addNewTimelineFunction }: Props) {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {incident.status==Status.Active&&<Button onClick={handleClick} variant='outlined'>+ Add Update</Button>}
            {open && <UpdateIncident addNewTimelineFunction={addNewTimelineFunction} open={open} onClose={handleClose} incident={incident} />}
        </div>
    )
}