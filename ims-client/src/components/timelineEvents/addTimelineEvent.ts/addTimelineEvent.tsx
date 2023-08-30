import { Button } from "@mui/material";
import React, { useState } from "react";

import { ITimeLineEvent } from "../../../interfaces/ITimeLineEvent";
import { Status } from "../../../interfaces/enums";
import AddTimelineForm, { receivedIncident } from "./addTimelineEventForm/addTimelineEventForm";

interface Props {
    incident: receivedIncident;
    addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void
}

export default function AddTimelineEvent({ incident,addNewTimelineFunction }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div>
            {incident.status == Status.Active && <Button onClick={handleClick} variant='outlined'>+ Add Update</Button>}
            {isOpen && <AddTimelineForm addNewTimelineFunction={addNewTimelineFunction} isOpen={isOpen} onClose={handleClose} incident={incident} />}
        </div>
    )
}