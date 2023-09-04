import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import { TabStyles } from "./Tabs.style";
import theme from "../../../theme";
import { IEventFilterProps } from "../../../interfaces/IEventFilterProps";

const UpTabs: React.FC<IEventFilterProps> = ({ setValue }) => {
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
    }
    if (newValue == 1) {
      setValue("Resolved");
    }
    setStatus(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box >
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
              textTransform: 'capitalize',
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
              textTransform: 'capitalize',
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default UpTabs;
