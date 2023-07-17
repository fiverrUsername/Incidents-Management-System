import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import theme from "../../theme";
import { EventProps } from "../IncidentTable/incidentTable";
import { TabStyles } from "./Tabs.style";

const UpTabs: React.FC<EventProps> = ({ onEvent, setValue }) => {
  const [status, setStatus] = useState<number>(0);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue == 0) {
      setValue("Active");
      onEvent("someFunction");
    }
    if (newValue == 1) {
      setValue("Resolved");
      onEvent("someFunction");
    }
    setStatus(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={status}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={TabStyles}
        >
          <Tab
            label="Active Incidents"
            {...a11yProps(0)}
            sx={{
              backgroundColor:
                status === 0
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.contrastText,
              borderRadius: "5px",
              border: `1px solid ${theme.palette.secondary.main}`,
            }}
          />
          <Tab
            label="Solved Incidents"
            {...a11yProps(1)}
            sx={{
              backgroundColor:
                status === 1
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.contrastText,
              borderRadius: "5px",
              border: `1px solid ${theme.palette.secondary.main}`,
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default UpTabs;
