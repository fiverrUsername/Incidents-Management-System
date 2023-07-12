import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import Search from "../Search/Search";
import {
  filterRowsBySearch,
  filterRowsByStatus,
} from "../../service/incidentTableService";
import Table from "../Table/Table";
import UpTabs from "../tabs/Tabs";
import IIncident from "../../interface/incidentInterface";
import { Box } from "@mui/material";

export type EventProps = {
  onEvent: (functionName: string) => void;
  setValue: (value: string) => void;
};

export interface IInceidentTableProps {
  rows: IIncident[];
}

const IncidentTable: React.FC<IInceidentTableProps> = ({ rows }) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "priority", headerName: "Priority", width: 120 },
    { field: "slackLink", headerName: "Slack Link", width: 200 },
    { field: "cost", headerName: "Cost", width: 120 },
    { field: "type", headerName: "Type", width: 120 },
  ];
  const someFunction = () => {
    console.log("The event was triggered!");
    filteredRows = filterRowsBySearch(rows, searchValue);
    filteredRows = filterRowsByStatus(filteredRows, statusValue);
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("Active");
  let filteredRows: IIncident[] = [];

  someFunction();

  return (
    <Box>
      <UpTabs onEvent={someFunction} setValue={setStatusValue}></UpTabs>
      <Search onEvent={someFunction} setValue={setSearchValue} />
      <Table columns={columns} rows={filteredRows}></Table>
    </Box>
  );
};

export default IncidentTable;
