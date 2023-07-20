import { Box, Button } from "@mui/material";
import React,{ useState } from "react";
import AddIncident from "./addIncident";

export default function AddIncidentComp() {
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
            {open && <AddIncident open={open} onClose={handleClose} />}   
        </div>
    )

}

