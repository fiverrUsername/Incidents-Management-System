import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import AddIncident from "./addIncident";

export interface Props {
    handleRefresh: () => void;
  }

export default function AddIncidentComp({handleRefresh}: Props) {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
        handleRefresh(); // כאשר הוא נסגר, נפעיל את הרענון בעמוד הראשי
    };
    
    return (
        <div>
            <Button onClick={handleClick} variant='outlined'>+ Add New</Button>
            {open && <AddIncident open={open} onClose={handleClose}/>}
        </div>
    )

}

