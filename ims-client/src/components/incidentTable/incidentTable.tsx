import { GridColDef, GridColumnHeaderParams, GridColumnVisibilityModel } from "@mui/x-data-grid";
import React, { useState } from "react";
import Search from "../search/search";
import {
  filterRowsBySearch,
  filterRowsByStatus,
} from "../../service/incidentTableService";
import Table from "../table/table";
import UpTabs from "../tabs/Tabs";
import IIncident from "../../interface/incidentInterface";
import AddIncidentComp from "../AddIncident/addIncidentComp";
import { Box, Typography } from "@mui/material";
import theme from "../../theme";


export type EventProps = {
  onEvent: (functionName: string) => void;
  setValue: (value: string) => void;
};

export interface IInceidentTableProps {
  rows: IIncident[];
  isLoading: boolean;
}
export interface ICollumnHeader {
  params: GridColumnHeaderParams
}
const ColumnHeader: React.FC<ICollumnHeader> = ({ params }) => {
  return (
    <Typography variant="bold" >
      {params.colDef.headerName}
    </Typography>)
}
const IncidentTable: React.FC<IInceidentTableProps> = ({ rows, isLoading }) => {

  const visibilityModel: GridColumnVisibilityModel =
  {
    id: false,
    type: false,
    date: false,
    tags: false,
    updatedAt: false,
    createdAt: false,
    slackLink: false,
  };

  const columns: GridColDef[] = [
    {
      field: "id", headerName: "Id", minWidth: 150, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "name", headerName: "Name", minWidth: 200, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "status", headerName: "Status", minWidth: 150, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "description", headerName: "Description", minWidth: 250, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "priority", headerName: "Priority", minWidth: 150, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "type", headerName: "Type", minWidth: 150, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "durationHours", headerName: "Duration (Hours)", minWidth: 200, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "slackLink", headerName: "Slack Link", minWidth: 200, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "tags", headerName: "Tags", minWidth: 200, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "date", headerName: "Date", minWidth: 150, maxWidth: 1700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "createdAt", headerName: "Created At", minWidth: 200, flex: 1,
      maxWidth: 500, renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "updatedAt", headerName: "Updated At", minWidth: 200, maxWidth: 700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
    {
      field: "cost", headerName: "Cost", minWidth: 150, maxWidth: 700, flex: 1,
      renderHeader: (params: GridColumnHeaderParams) =>
        <ColumnHeader params={params} />
    },
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
    <Box border={`1px solid ${theme.palette.grey[300]}`} borderRadius={10}>
    <Box display="grid" gridTemplateColumns="1fr auto" margin={4} >
      <Box >
        <UpTabs onEvent={someFunction} setValue={setStatusValue} />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Box style={{ marginRight: '8px' }}>
        <Search onEvent={someFunction} setValue={setSearchValue} />
        </Box>
        <AddIncidentComp />
      </Box>
    </Box>
      <Table columns={columns} rows={filteredRows} isLoading={isLoading} visibilityModel={visibilityModel} />
</Box>
  );
};

export default IncidentTable;
