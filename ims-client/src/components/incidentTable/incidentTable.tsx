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
  setValue: (value: string) => void;
};

export interface IInceidentTableProps {
  rows: IIncident[];
  isLoading: boolean;
  handleRefresh: () => void;
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
const IncidentTable: React.FC<IInceidentTableProps> = ({ rows, isLoading, handleRefresh }) => {

  const visibilityModel: GridColumnVisibilityModel =
  {
    id: false,
    type: false,
    date: false,
    tags: false,
    updatedAt: false,
    createdAt: false,
    slackLink: false,
    channelName: false,
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
      field: "currentPriority", headerName: "Priority", minWidth: 150, maxWidth: 1700, flex: 1,
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
      field: "channelName", headerName: "Channel Name", minWidth: 200, maxWidth: 1700, flex: 1,
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

  let filteredRows: IIncident[] = [];

  const [searchValue, setSearchValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("Active");

  filteredRows = filterRowsBySearch(rows, searchValue);
  filteredRows = filterRowsByStatus(filteredRows, statusValue);

  return (
    <Box border={`1px solid ${theme.palette.grey[300]}`} borderRadius={10} bgcolor={theme.palette.primary.contrastText}>
      <Box display="grid" gridTemplateColumns="1fr auto" margin='32px 32px 10px 16px' >
        <Box >
          <UpTabs setValue={setStatusValue} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Box style={{ marginRight: '8px' }}>
            <Search  setValue={setSearchValue} />
          </Box>
          <AddIncidentComp handleRefresh={handleRefresh} />
        </Box>
      </Box>
      <Table columns={columns} rows={filteredRows} isLoading={isLoading} visibilityModel={visibilityModel} />
    </Box>
  );
};

export default IncidentTable;
