import {Button } from "@mui/material";
import { useState } from "react";
import UpdateIncident, { GetIncident } from "./UpdateIncident";
import { ITimeLineEvent } from "../../interface/timeLineInterface";

interface Props {
    incident:GetIncident;
    addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void
}

export default function AddUpdateBtn({ incident,addNewTimelineFunction }: Props) {
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
            {open && <UpdateIncident addNewTimelineFunction={addNewTimelineFunction} open={open} onClose={handleClose} incident={incident} />}
        </div>
    )
}