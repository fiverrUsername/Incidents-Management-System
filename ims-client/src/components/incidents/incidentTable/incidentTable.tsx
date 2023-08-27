import { Box } from "@mui/material";
import { GridColDef, GridColumnHeaderParams, GridColumnVisibilityModel } from "@mui/x-data-grid";
import React, { useState } from "react";
import IIncident from "../../../interfaces/IIncident";
import theme from "../../../theme";
import UpTabs from "../tabs/Tabs";
import Search from "../../base/search/search";
import Table from "../../base/table/table";
import { ColumnHeader } from "../../base/table/columnHeader";
import AddIncident from "../addIncident/addIncident";
import { filterRowsByStatusAndSearch } from "../../../services/functions/incident/filters/filterRowsByStatusAndSearch";

interface IInceidentTableProps {
  rows: IIncident[];
  isLoading: boolean;
  incident: IIncident[];
  setIncident: any;
}

const IncidentTable: React.FC<IInceidentTableProps> = ({ rows, isLoading, incident, setIncident }) => {

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

  const columnsConfig: GridColDef[] = [
    { field: "id", headerName: "Id", minWidth: 150, maxWidth: 1700, },
    { field: "name", headerName: "Name", minWidth: 200, maxWidth: 1700, },
    { field: "status", headerName: "Status", minWidth: 150, maxWidth: 1700, },
    { field: "description", headerName: "Description", minWidth: 250, maxWidth: 1700, },
    { field: "currentPriority", headerName: "Priority", minWidth: 150, maxWidth: 1700, },
    { field: "type", headerName: "Type", minWidth: 150, maxWidth: 1700, },
    { field: "durationHours", headerName: "Duration (Hours)", minWidth: 200, maxWidth: 1700, },
    { field: "channelName", headerName: "Channel Name", minWidth: 200, maxWidth: 1700, },
    { field: "tags", headerName: "Tags", minWidth: 200, maxWidth: 1700, },
    { field: "date", headerName: "Date", minWidth: 150, maxWidth: 1700, },
    { field: "createdAt", headerName: "Created At", minWidth: 200, maxWidth: 500, },
    { field: "updatedAt", headerName: "Updated At", minWidth: 200, maxWidth: 700, },
    { field: "cost", headerName: "Cost", minWidth: 150, maxWidth: 700, },
  ];

  columnsConfig.forEach((column) => {
    column.flex = 1;
    column.renderHeader = (params: GridColumnHeaderParams) => <ColumnHeader params={params} />;
  });


  let filteredRows: IIncident[] = [];

  const [searchValue, setSearchValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("Active");

  filteredRows = filterRowsByStatusAndSearch(rows, statusValue, searchValue);

  return (
    <Box border={`1px solid ${theme.palette.grey[300]}`} borderRadius={10} bgcolor={theme.palette.primary.contrastText}>
      <Box display="grid" gridTemplateColumns="1fr auto" margin='32px 32px 10px 16px' >
        <Box >
          <UpTabs setValue={setStatusValue} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Box style={{ marginRight: '8px' }}>
            <Search setValue={setSearchValue} />
          </Box>
          <AddIncident incidents={incident} setIncident={setIncident} />
        </Box>
      </Box>
      <Table columns={columnsConfig} rows={filteredRows} isLoading={isLoading} visibilityModel={visibilityModel} />
    </Box>
  );
};

export default IncidentTable;
