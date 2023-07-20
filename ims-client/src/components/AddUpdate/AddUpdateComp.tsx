import { Box, Button } from "@mui/material";
import React,{ useState } from "react";
import AddUpdate from "./AddUpdate";
import IIncident from "../../interface/incidentInterface";

interface Props {
    incident: IIncident;
  }

export default function AddUpdateComp ({incident}:Props) {
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
            {open && <AddUpdate open={open} onClose={handleClose} incident={incident} />}   
        </div>
    )

}

